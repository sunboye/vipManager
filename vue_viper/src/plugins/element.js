import Vue from 'vue'
import {
    Button, Form, FormItem, Input, Message, Container, Tooltip, Dialog,
    Header, Footer, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup, Breadcrumb,
    BreadcrumbItem, Row, Col, Card, Table, TableColumn, Switch, Pagination,
    MessageBox, Tag, Radio, RadioGroup, RadioButton, Loading, Select, Option,
    OptionGroup
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

// window.$message = Message;