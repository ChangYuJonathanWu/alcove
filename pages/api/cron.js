export default async function handler(req, res) {
    // call home page endpoint
    const homePage = await fetch('https://www.alcove.place')
    console.log('Home Page Status: ', homePage.status)
    const profile = await fetch('https://www.alcove.place/healthcheck_test_endpoint')
    console.log('Profile Status: ', profile.status)
    return res.status(200).json({ success: homePage.Status === 200 && profile.Status === 200 });
}
