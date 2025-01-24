import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

const WEBHOOK_URL = "https://n8n.clauberj.com/webhook-test/85c6d2e9-9a03-48e8-af85-b65195da4dff"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Parse the request body
    const { project_id, message } = await req.json()

    console.log('Received request:', { project_id, message })

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id, message }),
    })

    if (!response.ok) {
      console.error('Webhook request failed:', response.statusText)
      throw new Error(`Webhook request failed: ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log('Webhook response:', responseData)

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error in webhook-proxy:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: corsHeaders, status: 500 }
    )
  }
})