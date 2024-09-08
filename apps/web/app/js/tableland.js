const { Wallet, getDefaultProvider } = require("ethers");
const { Database } = require("@tableland/sdk");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.PROVIDER_RPC_URL;

const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(rpcUrl);
const signer = wallet.connect(provider);
const db = new Database({ signer });

const tableName = "BountyTest4_84532_64";

//select the last id
async function selectId(){
    const query = `SELECT bountyId FROM ${tableName} ORDER BY bountyId DESC LIMIT 1`;
  
    const result = await db
      .prepare(query)
      .all();

    return result.results;
} 

//insert a new Bounty in tableland
async function insertBounty(
    bountyId,                       // The id generated in the smart contract
    bountyName,                     // The name of the bounty
    description,                    // Description of the bounty
    amount,                         // The amount of the bounty
    attestor,                       // The creator/attestor of the bounty
    freelancer,                     // The freelancer assigned to the bounty
    status,                         // The status of the bounty
    deadline,                       // The deadline for the bounty
    completedAt = null,             // Optional: When the bounty was completed, defaulting to null
    escrowAddress,                  // The address of the escrow
    createdAt,                      // The creation date, defaulting to the current date
    creationAttestationId = null,   // Attestation ID for creation
    completionAttestationId = null  // Optional: Attestation ID for completion, defaulting to null
  ) {
    
    const query = `INSERT INTO ${tableName} (bountyId, bountyName, description, amount, creator, freelancer, status, deadline, completedAt, escrowAddress, createdAt, creationAttestationId, completionAttestationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const result = await db
      .prepare(query)
      .bind(
        bountyId,
        bountyName,               
        description,              
        amount,                   
        attestor,                  
        freelancer,               
        status,                   
        deadline,                 
        completedAt,              
        escrowAddress,            
        createdAt,                
        creationAttestationId,    
        completionAttestationId   
      )
      .run();

      return result;
  }

//update the attestation id of the bounty
async function updateAttestationId(bountyId, attestationId){

  const query = `UPDATE ${tableName} SET (creationAttestationId) = (?) WHERE (bountyId) = (?)`;

  const result = await db
    .prepare(query)
    .bind(attestationId, bountyId)
    .run();

}

//select all the bounties of the freelancer
async function selectBountyFreelancer(freelancer){
  const query = `SELECT * FROM ${tableName} WHERE (freelancer) = (?) ORDER BY bountyId DESC`;

  const result = await db
    .prepare(query)
    .bind(freelancer)
    .all();

  return result.results;
}

//select all the bounties of the business
async function selectBountyBusiness(creator){
  const query = `SELECT * FROM ${tableName} WHERE (creator) = (?) ORDER BY bountyId DESC`;

  const result = await db
    .prepare(query)
    .bind(creator)
    .all();

  return result.results;
}

//accept a Bounty
async function acceptBounty(bountyId, status, completedAt, completionAttestationId){

  const query = `UPDATE ${tableName} SET status = (?), completedAt = (?), completionAttestationId = (?) WHERE bountyId = (?)`;

  const result = await db
    .prepare(query)
    .bind(status, completedAt, completionAttestationId, bountyId)
    .run();

}

module.exports = {
  selectId,
  insertBounty,
  updateAttestationId,
  selectBountyFreelancer,
  selectBountyBusiness,
  acceptBounty
};