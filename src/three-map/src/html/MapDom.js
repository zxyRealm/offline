class MapDom {
  constructor(mode, data) {
    this.mode = mode
    this.data = data
    this.createPage()
  }

  createPage() {
    this.app = document.getElementById('map')
    this.app.appendChild(this.createButtonUlDom(this.mode, this.data))
    this.app.appendChild(this.createGateDom(this.mode))
    this.app.appendChild(this.createLevitatenDom(this.mode))
  }

  createButtonUlDom(mode, list) {
    let buttonUl = document.createElement('div')
    buttonUl.setAttribute('id', 'button-ul')
    let floor = `
    <% if (mode === 0) { %>
    <a href='javascript:;' id='all'>总</a>
    <% } %>
    <span id="floor">
    <% for(let i = 0; i < list.length; i++) { %>
      <a><%= list[i].name %></a>
    <% } %>
    </span>
    <% if (mode === 0) { %>
    <a href='javascript:;' id='upfloor'>上升</a>
    <a href='javascript:;' id='downfloor'>下降</a>
    <% } %>
    `
    let parse = eval(this.compile(floor))
    buttonUl.innerHTML = parse()
    return buttonUl
  }

  createGateDom (mode) {
    let gateGroup = document.createElement('div')
    gateGroup.setAttribute('id', 'gate-group')

    let item = `
    <% if (mode === 1) { %>
    <div class="gate-item gate-red">
      <img src="./static/camera-inside.png" alt="">
      <span>内部出入口</span>
    </div>
    <div class="gate-item gate-orange">
      <img src="./static/camera-outside.png" alt="">
      <span>内部出入口</span>
    </div>
    <div class="gate-item gate-green">
      <img src="./static/camera-post.png" alt="">
      <span>通道</span>
    </div>
    <% } %>
    `
    let parse = eval(this.compile(item))
    gateGroup.innerHTML = parse()
    return gateGroup
  }

  createLevitatenDom () {
    let levitaten = document.createElement('div')
    levitaten.setAttribute('id', 'device__popper--wrap')
    levitaten.setAttribute('class', 'levitaten')

    let context = `
    <div class="title">
      <div class="pull-right">
        <img src="./static/edit_icon2x.png" data-type="editPortal" alt="">
        <img src="./static/delete_icon.png" data-type="deletePortal" alt="">
      </div>
      <div class="pull-left">
        <p id="device--title" class="ellipsis"></p>
      </div>
    </div>
    <div class="device-list-wrap">
      <ul class="device-list" id="device--list">
      </ul>
    </div>
    <div class="add-button">
      <a href="javascript:void (0);" data-type="add">添加设备</a>
    </div>
    <div class="horizontal-line"></div>
    `
    levitaten.innerHTML = context
    return levitaten
  }

  compile (template) {
    const evalExpr = /<%=(.+?)%>/g
    const expr = /<%([\s\S]+?)%>/g

    template = template.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`').replace(expr, '`); \n $1 \n  echo(`')

    template = 'echo(`' + template + '`);'

    let script = `(function parse(data){
      let output = "";
  
      function echo(html){
        output += html;
      }
  
      ${template}
  
      return output;
    })`

    return script
  }
}

export default MapDom;
