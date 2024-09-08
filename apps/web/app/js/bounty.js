const { selectId, insertBounty, updateAttestationId, selectBountyFreelancer, selectBountyBusiness, acceptBounty, selectCompletedBountyBusiness } = require('./tableland');
const { createCommitmentAttestation, createFinalizationAttestation } = require('./signProtocol');

//creation of the bounty and the attestation commitment
async function create_Bounty(  
    bountyId  ,                     // The id generated in the smart contract
    bountyName,                     // The name of the bounty
    description,                    // Description of the bounty
    amount,                         // The amount of the bounty
    attestor,                       // The creator/attestor of the bounty
    freelancer,                     // The freelancer assigned to the bounty
    deadline                       // The deadline for the bounty
  ) {

    const escrowAddress = "";
    const date = new Date(deadline);
    const deadlineTimestamp = date.getTime();
    const createdAt = new Date().getTime();

    //insert the bounty in tableland
    console.log(bountyId, bountyName, description, amount, attestor, freelancer, "In progress", deadlineTimestamp, null, escrowAddress, new Date(), 0, 0)
    const resultInsert = await insertBounty(bountyId, bountyName, description, amount, attestor, freelancer, "In progress", deadlineTimestamp, null, escrowAddress, new Date(), 0, 0);

    //create the attestation with sign protocol
    console.log(attestor, createdAt, bountyId, bountyName, description, freelancer, deadlineTimestamp);
    const resultCommitment = await createCommitmentAttestation(attestor, createdAt, bountyId, bountyName, description, freelancer, deadlineTimestamp)
    const attestationId = resultCommitment.attestationId;
    console.log(attestationId);

    //update the attestation id in tableland
    updateAttestationId(bountyId, attestationId);

}

//select all the bounties of the freelancer
async function selectAllBountyFreelancer(freelancer){

  const result = await selectBountyFreelancer(freelancer);
  
  //update the deadline format
  const updatedResult = result.map(bounty => {    
    const deadlineDate = new Date(bounty.deadline);
    const formattedDeadline = `${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}/${deadlineDate.getFullYear()}`;

    return {
      ...bounty,
      deadline: formattedDeadline 
    };
  });

  return updatedResult;

}

//select all the bounties of the business
async function selectAllBountyBusiness(creator){

  const result = await selectBountyBusiness(creator, "In progress");
  
  //update the deadline format
  const updatedResult = result.map(bounty => {    
    const deadlineDate = new Date(bounty.deadline);
    const formattedDeadline = `${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}/${deadlineDate.getFullYear()}`;

    return {
      ...bounty,
      deadline: formattedDeadline 
    };
  });

  return updatedResult;

}

//select all the bounties of the business
async function selectAllCompletedBountyBusiness(creator){

  const result = await selectCompletedBountyBusiness(creator, "Completed");
  
  //update the deadline format
  const updatedResult = result.map(bounty => {    
    const deadlineDate = new Date(bounty.deadline);
    const formattedDeadline = `${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}/${deadlineDate.getFullYear()}`;

    return {
      ...bounty,
      deadline: formattedDeadline 
    };
  });

  return updatedResult;

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

module.exports = {
  create_Bounty,
  selectAllBountyFreelancer,
  selectAllBountyBusiness,
  selectAllCompletedBountyBusiness,
  finalizeBounty
};