import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

const WEBHOOK_URL = "https://webhook.clauberj.com/webhook/85c6d2e9-9a03-48e8-af85-b65195da4dff"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Parse the request body
    const { project_id, message } = await req.json()

    console.log('Received request:', { project_id, message })

    // Add more detailed logging before making the webhook request
    console.log('Attempting to call webhook URL:', WEBHOOK_URL)

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id, message }),
    })

    // Log the raw response for debugging
    console.log('Webhook raw response:', {
      status: response.status,
      statusText: response.statusText,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Webhook request failed:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      throw new Error(`Webhook request failed: Status ${response.status} - ${errorText || response.statusText}`)
    }

    let responseData
    try {
      responseData = await response.json()
    } catch (e) {
      console.log('Response is not JSON:', await response.text())
      responseData = { message: 'Success (non-JSON response)' }
    }

    console.log('Webhook response data:', responseData)

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { headers: corsHeaders }
    )
  } catch (error) {
    console.error('Error in webhook-proxy:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { headers: corsHeaders, status: 500 }
    )
  }
})