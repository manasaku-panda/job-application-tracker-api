const profileCacheKey = (role,userId)=>{
    return `profile:${role}:${userId}`;
}

module.exports = {
    profileCacheKey
}