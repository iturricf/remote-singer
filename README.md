# Remote signer

This is a PoC of a EVM compatible remote signer.

Still working on how supporting multimple signers.

## Install

```bash
$ npm install
```

## Usage

Before starting the server make sure you run a local ganache node on port 7545.

You can pick any private key from the ganache accounts to use as signer, and pass it as the SIGNER env variable, like it's done in the example below.

Also, you can pass the recipient address as the RECIPIENT env variable, as it is shown in the example below.

### Start the server

```bash
$ SINGER=<YOUR PRIVATE KEY> npm run start
```

### Run the example

```bash
$ RECIPIENT=<YOUR ADDRESS> npm run example
```
