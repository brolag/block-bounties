import { create_Bounty } from '../../js/bounty';

export async function POST(req) {
  const body = await req.json();

  const { bountyId, bountyName, description, amount, attestor, freelancer, deadline } = body;

  try {
    const result = await create_Bounty(bountyId, bountyName, description, amount, attestor, freelancer, deadline);
    return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}