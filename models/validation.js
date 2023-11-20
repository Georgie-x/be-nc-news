

const numOfComments = async (article_id) => {
try{
    const query = `SELECT COUNT(*) FROM comments WHERE article_id = $1 ORDER BY created_at DESC`
	const body = await db.query(query, [article_id])
    console.log(body)
}
catch(err){
    console.log(err)
}
}

module.exports = {numOfComments}