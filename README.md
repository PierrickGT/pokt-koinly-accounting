# pokt-koinly-accounting

Script using [POKTscan GraphQL API](https://poktscan.com/explore?tab=api) to retrieve transactions and export them in the [Koinly](https://koinly.io) CSV format for tax purpose.

## Usage

Write down your `POKTSCAN_API_KEY` and `NODE_ADDRESS` in your `.envrc`.

Once written down, load your env with:
```
direnv allow
```

### getRewards

The [getRewards.ts](./scripts/getRewards.ts) script, retrieves rewards for relays and blocks produces by your node.

You can adjust the date range by modifying [`startDate`](./scripts/getRewards.ts#L24) and [`endDate`](./scripts/getRewards.ts#L25).

You can also modify the CSV filename and export path on [line 45](./scripts/getRewards.ts#L45).

Once your setup is done, generate your CSV export with the following command:
```
yarn getRewards
```

### getTransfers

The [getTransfers.ts](./scripts/getTransfers.ts) script, retrieves transfers from your node to another address.

You need to add the `TO_ADDRESS` to your `.envrc` and load it with:
```
direnv allow
```

You can adjust the date range by modifying [`startDate`](./scripts/getTransfers.ts#L23) and [`endDate`](./scripts/getTransfers.ts#L24).

You can also modify the CSV filename and export path on [line 39](./scripts/getTransfers.ts#L39).

Once your setup is done, generate your CSV export with the following command:
```
yarn getTransfers
```

## Development

This project uses [graphql-request](https://www.npmjs.com/package/graphql-request) to query GraphQL endpoints and [json2csv](https://www.npmjs.com/package/json2csv) to export results in a CSV file.

### Env

[direnv](https://direnv.net) is used to manage environment variables. You'll likely need to install it.

Copy `.envrc.example` and write down the env variables needed to run this project:
```
cp .envrc.example .envrc
```

Once your env variables are setup, load them with:
```
direnv allow
```

### Code quality

[Prettier](https://prettier.io) is used to format TypeScript code. Use it by running:

```
yarn format
```
Or per file:

```
yarn format:file ./scripts/getRewards.ts
```
