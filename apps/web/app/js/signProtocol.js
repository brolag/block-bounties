const { SignProtocolClient, SpMode, EvmChains } = require("@ethsign/sp-sdk");
const { privateKeyToAccount } =  require("viem/accounts");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.PROVIDER_RPC_URL;
const commitmentSchemaId = process.env.COMMITMENT_SCHEMA_ID;
const finalizationSchemaId = process.env.FINALIZATION_SCHEMA_ID;

const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    account: privateKeyToAccount(privateKey),
  }); 

async function createCommitmentAttestation(attestor, timestamp, bountyId, bountyName, description, freelancer, deadline) {
  const res = await client.createAttestation({
    schemaId: commitmentSchemaId,
    data: {
      attestor,
      timestamp,
      bountyId,
      bountyName,
      description,
      freelancer,
      deadline
    },
    indexingValue: attestor.toLowerCase()
  });

  return res;

}

async function createFinalizationAttestation(attestor, timestamp, bountyId, freelancer, completedAt) {
  const res = await client.createAttestation({
    schemaId: finalizationSchemaId,
    data: {
      attestor,
      timestamp,
      bountyId,
      freelancer,
      completedAt
    },
    indexingValue: attestor.toLowerCase()
  });

  return res;

}

module.exports = {
  createCommitmentAttestation,
  createFinalizationAttestation
};