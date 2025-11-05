---
title: npmrc 配置优先级
description: 介绍 npmrc 配置文件的解析优先级
keywords: ["npmrc", "nodejs", "node"]
tags: ["npmrc", "nodejs", "node"]
---

## 配置文件位置

四个相关的 `.npmrc` 文件是：

- 项目级配置文件：`/path/to/my/project/.npmrc`（项目根目录，作为 `package.json` 的同级）
- 用户级配置文件：`~/.npmrc`
- 全局配置文件：`$PREFIX/etc/npmrc`（`$PREFIX` 为 npm 的安装前缀）
- npm 内置配置文件：`/path/to/npm/npmrc`（不可更改，供发行版维护者覆盖默认配置）

所有 `.npmrc` 文件都采用 INI 格式的 `key = value` 键值对，以 `;` 或 `#` 开头的行会被视为注释。支持环境变量插值，也就是可以使用 `${VARIABLE_NAME}` 替换环境变量的值。例如：

```ini
prefix = ${HOME}/.npm-packages
```

数组通过在键名后添加 `[]` 指定，同一个键可重复出现以追加多值：

```ini
key[] = "first value"
key[] = "second value"
```

## 解析优先级（从高到低）

当同一键在多个来源出现时，优先级从高到低如下：

1.**命令行参数（CLI flags）**

2.**环境变量**（`NPM_CONFIG_*` 或 `npm_config_*`）

3.**项目级 `.npmrc`**

4.**用户级 `~/.npmrc`**

5.**全局 `$PREFIX/etc/npmrc`**

6.**npm 内置 `/path/to/npm/npmrc`**

高优先级来源会覆盖低优先级来源的同名键。例如，`~/.npmrc` 中的设置会覆盖全局 `$PREFIX/etc/npmrc` 中的设置；项目级 `.npmrc` 会覆盖用户级、全局级与内置配置。

## npm-config

### 获取配置

使用以下命令可以获取不同层级的配置文件路径：

```shell
# 获取用户配置
npm config get userconfig

# 获取全局配置
npm config get globalconfig
```

使用 `npm config list` 获取最终合并的所有配置，并带有各个配置的层级来源，例如：

```shell
; "user" config from /Users/you/.npmrc
registry = "https://registry.npmmirror.com/"

; "global" config from /usr/local/etc/npmrc
prefix = "/usr/local"

; node bin location = /usr/local/bin/node
; cwd = /your/project/path
; HOME = /Users/you
; Run `npm config ls -l` to show all defaults.
```

如果使用`npm config list --long`（`npm config ls -l`），则会额外显示 npm 内置的默认配置，例如：

```shell
; "default" config from default values

_auth = (protected)
access = null
all = false
allow-same-version = false
also = null
audit = true
audit-level = null
auth-type = "web"
before = null
bin-links = true
browser = null
ca = null
#...

; "user" config from /Users/you/.npmrc
registry = "https://registry.npmmirror.com/"
#...

; "global" config from /usr/local/etc/npmrc
prefix = "/usr/local"
#...
```

### 删除配置

```shell
npm config delete key [key ...]
```

### 修改配置

1.使用上面的 CLI 命令获取配置文件路径后直接编辑文件删除；

2.使用`npm config edit`直接在系统文本编辑器中打开所有配置，然后修改；

3.使用 CLI 命令修改某个值

```shell
npm config set key=value [key=value...]
npm set key=value [key=value...]
```

### 全局配置

以上 npm config 命令都支持使用 `--global` 参数，用来指定是否为全局模式。

## 注意事项（项目级与全局模式）

- 项目级 `.npmrc` 仅在你位于该项目根目录时生效，对发布后的模块消费者没有影响。
- 不能通过 `.npmrc` 强制全局安装或更改安装位置。
- 在全局模式（如 `npm install -g`）下，项目级 `.npmrc` 不会被读取。

- 认证相关的键必须指定作用域到特定的 registry/主机（或主机路径），以确保凭证不会发往错误的地址。需作用域化的键有：`_auth`、`_authToken`、`username`、`_password`

作用域示例（推荐写法）：

```ini
; 为某个 scope 指定自定义 registry（示例）
@myscope:registry = https://mycustomregistry.example.org

; 将令牌作用域到 npm 官方 registry 主机
//registry.npmjs.org/:_authToken = MYTOKEN

; 将令牌作用域到某个主机（不含路径）
//somewhere-else.com/:_authToken = MYTOKEN

; 将令牌作用域到主机上的特定路径
//somewhere-else.com/myorg/:_authToken = MYTOKEN1
//somewhere-else.com/another/:_authToken = MYTOKEN2
```

错误写法示例（未作用域化）：

```ini
; ❌ 未作用域化，会有凭证泄露风险
_authToken = MYTOKEN
```

## 示例：优先级生效对比

假设同时配置了多个来源的 `registry`：

用户级 `~/.npmrc`：

```ini
registry = https://registry.npmjs.org
```

项目级 `/path/to/my/project/.npmrc`：

```ini
registry = https://registry.npmmirror.com
```

命令行运行：

```bash
# 在项目根目录内运行（项目级覆盖用户级）
npm install

# 显式通过 CLI 覆盖所有文件来源
npm --registry=https://registry.npmjs.org install
```

结果：

- 在项目内直接运行 `npm install`，最终使用 `https://registry.npmmirror.com`（项目级优先）。
- 当通过命令行为 `--registry` 传值时，最终使用命令行提供的值（CLI 优先级最高）。

## 参考资料

- npm 官方文档：npmrc | npm Docs — https://docs.npmjs.com/cli/v8/configuring-npm/npmrc
