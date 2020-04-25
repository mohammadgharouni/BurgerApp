import {configure, shallow} from "enzyme"
import Adaptor from "enzyme-adapter-react-16"
import NavigationItems from "./NavigationItems"
import navigationItem from "./NavigationItem/NavigationItem"
import React from 'react'


configure({adapter:new Adaptor()})
describe("<NavigationItems/>",()=>{


    it("should render two <nav> elemnt if not authenticated",()=>{
        const wrapper= shallow(<NavigationItems/>);
        expect(wrapper.find(navigationItem)).toHaveLength(2)
  
    })

    

    it("should render three <nav> elemnt if  authenticated",()=>{
        const wrapper= shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(navigationItem)).toHaveLength(3)
  
    })



})