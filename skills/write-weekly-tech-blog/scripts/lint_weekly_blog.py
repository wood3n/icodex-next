#!/usr/bin/env python3
"""Lint repository weekly technical blog conventions using only stdlib."""

from __future__ import annotations

import re
import sys
from pathlib import Path


REQUIRED_FRONTMATTER = {"title", "slug", "authors", "description", "keywords", "tags"}
FORBIDDEN_TEXT = (
    "总而言之",
    "众所周知",
    "值得注意的是",
    "画卷",
    "框架",
)
FORBIDDEN_SECTIONS = (
    "本周观察",
    "本周总结",
    "趋势观察",
    "本周未记录",
)
FILLER_PATTERNS = (
    "值得关注",
    "更重要的是",
    "这一点很关键",
    "对团队来说",
    "本周更新主要集中在",
)


def split_frontmatter(text: str) -> tuple[str, str]:
    if not text.startswith("---\n"):
        return "", text
    end = text.find("\n---\n", 4)
    if end == -1:
        return "", text
    return text[4:end], text[end + 5 :]


def frontmatter_keys(frontmatter: str) -> set[str]:
    return {
        match.group(1)
        for line in frontmatter.splitlines()
        if (match := re.match(r"^([A-Za-z][A-Za-z0-9_-]*):", line))
    }


def next_nonempty(lines: list[str], start: int) -> tuple[int, str] | None:
    for index in range(start, len(lines)):
        if lines[index].strip():
            return index, lines[index].strip()
    return None


def lint(path: Path) -> tuple[list[str], list[str]]:
    text = path.read_text(encoding="utf-8")
    frontmatter, body = split_frontmatter(text)
    errors: list[str] = []
    warnings: list[str] = []

    if not frontmatter:
        errors.append("missing or unclosed YAML frontmatter")
    else:
        missing = REQUIRED_FRONTMATTER - frontmatter_keys(frontmatter)
        if missing:
            errors.append(f"missing frontmatter keys: {', '.join(sorted(missing))}")

    body_lines = body.splitlines()
    first = next_nonempty(body_lines, 0)
    if not first or first[1] != "本文由 codex 整理发布。":
        errors.append("first rendered body line must be exact Codex disclosure")

    if body.count("<!--truncate-->") != 1:
        errors.append("expected exactly one <!--truncate--> marker")

    intro_end = body.find("<!--truncate-->")
    intro = body[:intro_end] if intro_end >= 0 else body[:500]
    title_match = re.search(r"^title:\s*(.+)$", frontmatter, re.MULTILINE)
    title = title_match.group(1) if title_match else ""
    expected_phrase = "AI 产品周报" if "AI" in title else "前端技术周报"
    if expected_phrase not in intro:
        errors.append(f"intro must naturally contain `{expected_phrase}`")

    h2_count = len(re.findall(r"^## ", body, re.MULTILINE))
    h3_matches = list(re.finditer(r"^###\s+(.+?)\s*$", body, re.MULTILINE))
    if h2_count < 1:
        errors.append("no level-2 category sections")
    if not h3_matches:
        errors.append("no level-3 technology subsections")
    if len(h3_matches) > 7:
        errors.append(
            f"too many technology subsections: {len(h3_matches)}; keep at most 7 material items"
        )

    for match in h3_matches:
        heading = match.group(1)
        line_no = body[: match.start()].count("\n") + 1
        after = body[match.end() :].splitlines()
        source = next_nonempty(after, 0)
        if not source or not source[1].startswith("> 参考来源："):
            errors.append(
                f"line {line_no}: `{heading}` needs immediate `> 参考来源：` blockquote"
            )

    paragraph_start = 0
    for paragraph in re.split(r"\n\s*\n", body):
        paragraph_start = body.find(paragraph, paragraph_start)
        line_no = body[:paragraph_start].count("\n") + 1
        plain = re.sub(r"\[[^\]]+\]\([^)]+\)", "", paragraph).strip()
        if (
            len(plain) > 260
            and not plain.startswith(("---", ">", "-", "#"))
        ):
            warnings.append(f"line {line_no}: paragraph exceeds 260 characters")
        paragraph_start += len(paragraph)

    for phrase in FORBIDDEN_TEXT:
        if phrase in body:
            errors.append(f"forbidden text found: `{phrase}`")

    for section in FORBIDDEN_SECTIONS:
        if re.search(rf"^##+\s+{re.escape(section)}\s*$", body, re.MULTILINE):
            errors.append(f"forbidden section found: `{section}`")

    for phrase in FILLER_PATTERNS:
        count = body.count(phrase)
        if count:
            warnings.append(f"filler pattern `{phrase}` found {count} time(s)")

    return errors, warnings


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: lint_weekly_blog.py <post.md>", file=sys.stderr)
        return 2
    path = Path(sys.argv[1])
    if not path.is_file():
        print(f"error: file not found: {path}", file=sys.stderr)
        return 2

    errors, warnings = lint(path)
    for item in errors:
        print(f"ERROR: {item}")
    for item in warnings:
        print(f"WARN: {item}")
    print(f"{path}: {len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
