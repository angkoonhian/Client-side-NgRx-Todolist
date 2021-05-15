import React from "react";
import Skyline from "../images/skyline.jpg";
import { Tooltip, Typography, Avatar } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import "../App.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Heading,
  Input,
  Button,
} from "@chakra-ui/react";
import LoginPage from "./login/LoginPage";

const LandingPage = (props) => {
  const { setScreen } = props;

  const handleLogOut = () => {
    setScreen("LoginPage");
  };

  const handleAddContract = () => {
    setScreen("ContractsPage");
  };

  const { Title } = Typography;

  return (
    <div>
      <img src={Skyline} alt='skyline' width='100%'></img>
      <div className='navbar'>
        <Avatar icon={<UserOutlined />} />
        <h4>username</h4>
        <Menu>
          <MenuButton as={Button}>X</MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className='header'>
        <Heading>Build to Connect</Heading>
        <Heading size='sm'>
          Building Meaningful Connections Between Contractors in Singapore
        </Heading>
      </div>
      <div className='searchbar'>
        <Input
          bgColor='white'
          size='large'
          placeholder='Contractor Name...'
        ></Input>
        <Input
          bgColor='white'
          size='large'
          placeholder='Specialisation...'
        ></Input>
        <Button>
          <SearchOutlined />
        </Button>
      </div>
      <Button onClick={handleAddContract}>Add Contract</Button>
      <Button>Search Contracts</Button>
    </div>
  );
};

export default LandingPage;
