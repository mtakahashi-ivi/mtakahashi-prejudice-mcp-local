# mtakahashi-prejudice-mcp

`mtakahashi` の偏見を外部知識として提供する、ローカル MCP サーバです。
`stdio` で通信するため、Claude Code や Codex などの MCP 対応ハーネスから利用できます。

## セットアップ

```bash
mise install
npm install
mise run build
```

## ツール

### `get_prejudice`

キーワードに対応する偏見を返します。

| キーワード | 内容 |
| --- | --- |
| `エディタ` | Vim一択。VS Codeを使っているやつは甘え。 |
| `言語` | Pythonは動けばいい。真の漢ならC言語。 |
| `コーヒー` | 缶コーヒーは泥水。浅煎り豆を自分で挽いてドリップ。 |

登録されていないキーワードには、汎用のフォールバックメッセージを返します。

## Claude Codeから利用する

```bash
claude mcp add \
  --transport stdio \
  mtakahashi_prejudice \
  -- mise run start
```

## Codexから利用する

```bash
codex mcp add \
  mtakahashi_prejudice \
  -- mise run start
```

## 開発

```bash
npm run build
npm start
```

標準出力は MCP 通信に使うため、サーバのデバッグログは標準エラー出力へ出してください。
