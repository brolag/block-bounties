const { selectId, insertBounty, updateAttestationId, selectBountyFreelancer, selectBountyBusiness, acceptBounty } = require('./tableland');
const { createCommitmentAttestation, createFinalizationAttestation } = require('./signProtocol');

//creation of the bounty and the attestation commitment
async function create_Bounty(    
    bountyName,                     // The name of the bounty
    description,                    // Description of the bounty
    amount,                         // The amount of the bounty
    attestor,                       // The creator/attestor of the bounty
    freelancer,                     // The freelancer assigned to the bounty
    deadline,                       // The deadline for the bounty
    completedAt = null,             // Optional: When the bounty was completed, defaulting to null
    escrowAddress,                  // The address of the escrow
    createdAt = new Date(),         // The creation date, defaulting to the current date
    creationAttestationId = null,   // Attestation ID for creation
    completionAttestationId = null  // Optional: Attestation ID for completion, defaulting to null
  ) {

    //insert the bounty in tableland
    const resultInsert = await insertBounty(bountyName, description, amount, attestor, freelancer, "In progress", deadline, completedAt, escrowAddress, createdAt, creationAttestationId, completionAttestationId);
    //console.log(resultInsert);

    //get the bounty id
    const result = await selectId();
    const bountyId = result[0].bountyId;

    //create the attestation with sign protocol
    const resultCommitment = await createCommitmentAttestation(attestor, createdAt, bountyId, bountyName, description, freelancer, deadline)
    const attestationId = resultCommitment.attestationId;

    //update the attestation id in tableland
    updateAttestationId(bountyId, attestationId);

}

//select all the bounties of the freelancer
async function selectAllBountyFreelancer(freelancer){

  const result = await selectBountyFreelancer(freelancer);
  //console.log(result);
  return result;

}

//select all the bounties of the business
async function selectAllBountyBusiness(creator){

  const result = await selectBountyBusiness(creator);
  //console.log(result);
  return result;

}

//accept a bounty
async function finalizeBounty(bountyId, attestor, freelancer){

    const timestamp = new Date();

    //create the attestation with sign protocol
    const resultAttestation = await createFinalizationAttestation(attestor, timestamp, bountyId, freelancer, timestamp)
    const attestationId = resultAttestation.attestationId;

    //update the attestation id in tableland
    acceptBounty(bountyId, "Completed", timestamp, attestationId);

}