import { selectAllBountyFreelancer } from '../../js/bounty';

export async function GET(req) {
  
  const { searchParams } = new URL(req.url);
  const freelancer = searchParams.get('freelancer');

  try {    
    const result = await selectAllBountyFreelancer(freelancer);
    return new Response(JSON.stringify({ success: true, data: result }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
