const getters = {
  token: state => state.user.token,
  companyId: state => state.user.companyId,
  userId: state => state.user.userId,
  name: state => state.user.name
}
export default getters
