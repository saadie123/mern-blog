import React from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header } = Layout;

class Navbar extends React.Component {
  state = {
    current: "/app"
  };
  componentDidMount() {
    console.log(this.props.history);
  }
  onItemClicked = event => {
    this.setState({
      current: event.key
    });
    this.props.history.push(event.key);
    console.log(event);
  };

  render() {
    return (
      <Header>
        <Menu
          onClick={this.onItemClicked}
          style={{ padding: "0px 100px", lineHeight: "64px" }}
          mode="horizontal"
          theme="dark"
          selectedKeys={[this.state.current]}
        >
          <Menu.Item key="/login">
            <Icon type="mail" />
            Login
          </Menu.Item>
          <Menu.Item key="/app">
            <Icon type="appstore" />
            Navigation Two
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(Navbar);
