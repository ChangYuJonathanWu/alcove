
const OPS_GENIE_API_KEY = process.env.OPS_GENIE_API_KEY
export const createAlert = async (message, description, priority) => {
    console.log("Creating alert with message: " + message + " and priority: " + priority)
    const result = await fetch("https://api.opsgenie.com/v2/alerts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `GenieKey ${OPS_GENIE_API_KEY}`
        },
        body: JSON.stringify({
            message,
            description,
            priority
        })

    })
    console.log(result)
    return result
}