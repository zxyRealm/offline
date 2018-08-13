const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.userInfo.faceImgURL ? state.userInfo.faceImgURL : '/static/img/default_avatar.png'
}
export default getters
