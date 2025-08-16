export const registerFormControls = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : 'Enter your user name',
        componentType : 'input',
        type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    }
]

export const loginFormControls = [
  {
    name: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    componentType: 'input',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input',
  },
];

export const addProductFormElements = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Enter product name',
    type: 'text',
    componentType: 'input',
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter product description',
    componentType: 'textarea',
  },
  {
    label: 'Category',
    name: 'category',
    componentType: 'select',
    options: [
      { id : "men", label: "Men"},
      { id : "women", label: "Women"},
      { id : "kids", label: "Kids"},
      { id : "accessories", label: "Accessories"},
      { id : "footwear", label: "Footwear"},
    ],
  },
  {
    name: 'brand',
    label: 'Brand',
    componentType: 'select',
    options: [
      { id: 'nike', label: 'Nike' },
      { id: 'adidas', label: 'Adidas' },
      { id: 'puma', label: 'Puma' },
      { id: 'reebok', label: 'Reebok' },
      { id: 'underArmour', label: 'Under Armour' },
      { id: 'newBalance', label: 'New Balance' },
      { id: 'asics', label: 'Asics' },
      { id: 'converse', label: 'Converse' },
      { id: 'vans', label: 'Vans' },
      { id: 'fila', label: 'Fila' },
      { id: 'skechers', label: 'Skechers' },
      { id: 'brooks', label: 'Brooks' },
      { id: 'mizuno', label: 'Mizuno' },
      { id: 'hokaOneOne', label: 'Hoka One One' },
      { id: 'onRunning', label: 'On Running' },
      { id: 'salomon', label: 'Salomon' },
      { id: 'columbia', label: 'Columbia' },
      { id: 'theNorthFace', label: 'The North Face' },
      { id: 'patagonia', label: 'Patagonia' },
      { id: 'arcTeryx', label: "Arc'teryx" },
      { id: 'montbell', label: 'Montbell' },
      { id: 'mammut', label: 'Mammut' },
      { id: 'blackDiamond', label: 'Black Diamond' },
      { id: 'reiCoop', label: 'REI Co-op' },
    ],
  },
  {
    name: 'price',
    label: 'Price',
    placeholder: 'Enter product price',
    type: 'number',
    componentType: 'input',
  },
  {
    name: 'salePrice',
    label: 'Sale Price',
    placeholder: 'Enter sale price (if applicable)',
    type: 'number',
    componentType: 'input',
  },
  {
    label: 'Total Stock',
    name: 'totalStock',
    placeholder: 'Enter total stock',
    type: 'number',
    componentType: 'input',
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    label: 'Home',
    id: 'home',
    path: '/shop/home',
  },
  {
    label: 'Men',
    id: 'men',
    path: '/shop/listing',
  },
  {
    label: 'Women',
    id: 'women',
    path: '/shop/listing',
  },
  {
    label: 'Kids',
    id: 'kids',
    path: '/shop/listing',
  },
  {
    label: 'Accessories',
    id: 'accessories',
    path: '/shop/listing',
  },
  {
    label: 'Footwear',
    id: 'footwear',
    path: '/shop/listing',
  },
];

export const categoryOptionsMap = {
  'men' : 'Men',
  'women' : 'Women',
  'kids' : 'Kids',
  'accessories' : 'Accessories',
  'footwear' : 'Footwear',
}

export const brandOptionsMap = {
  'nike': 'Nike',
  'adidas': 'Adidas',
  'puma': 'Puma',
  'reebok': 'Reebok',
  'underArmour': 'Under Armour',
  'newBalance': 'New Balance',
  'asics': 'Asics',
  'converse': 'Converse',
  'vans': 'Vans',
  'fila': 'Fila',
  'skechers': 'Skechers',
  'brooks': 'Brooks',
  'mizuno': 'Mizuno',
  'hokaOneOne': 'Hoka One One',
  'onRunning': 'On Running',
  'salomon': 'Salomon',
  'columbia': 'Columbia',
  'theNorthFace': 'The North Face',
  'patagonia': 'Patagonia',
  'arcTeryx': "Arc'teryx",
  'montbell': 'Montbell',
  'mammut': 'Mammut',
  'blackDiamond': 'Black Diamond',
  'reiCoop': 'REI Co-op',
};

export const filterOptions = {
  category: [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'kids' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'footwear', label: 'Footwear' }
  ],
  brand: [
    { id: 'nike', label: 'Nike' },
    { id: 'adidas', label: 'Adidas' },
    { id: 'puma', label: 'Puma' },
    { id: 'reebok', label: 'Reebok' },
    { id: 'underArmour', label: 'Under Armour' },
    { id: 'newBalance', label: 'New Balance' },
    { id: 'asics', label: 'Asics' },
    { id: 'converse', label: 'Converse' },
    { id: 'vans', label: 'Vans' },
    { id: 'fila', label: 'Fila' },
    { id: 'skechers', label: 'Skechers' },
    { id: 'brooks', label: 'Brooks' },
    { id: 'mizuno', label: 'Mizuno' },
    { id: 'hokaOneOne', label: 'Hoka One One' },
    { id: 'onRunning', label: 'On Running' },
    { id: 'salomon', label: 'Salomon' },
    { id: 'columbia', label: 'Columbia' },
    { id: 'theNorthFace', label: 'The North Face' },
    { id: 'patagonia', label: 'Patagonia' },
    { id: "arcTeryx", label: "Arc'teryx" },
    { id: 'montbell', label: 'Montbell' },
    { id: 'mammut', label: 'Mammut' },
    { id: 'blackDiamond', label: 'Black Diamond' },
    { id: 'reiCoop', label: 'REI Co-op' }
  ],
};

export const sortOptions = [
  { id: 'priceAsc', label: 'Price: Low to High' },
  { id: 'priceDesc', label: 'Price: High to Low' },
  { id: 'title-atoz', label: 'Title: A to Z' },
  { id: 'title-ztoa', label: 'Title: Z to A' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'oldest', label: 'Oldest Arrivals' },
];

export const addressFormControls = [
  {
    label : 'Address',
    name : 'address',
    componentType : 'input',
    type : 'text',
    placeholder : 'Enter your address',
  },
  {
    label : 'City',
    name : 'city',
    componentType : 'input',
    type : 'text',
    placeholder : 'Enter your city',
  },
  {
    label : 'Pincode',
    name : 'pincode',
    componentType : 'input',
    type : 'text',
    placeholder : 'Enter your pincode',
  },
  {
    label : 'Phone',
    name : 'phone',
    componentType : 'input',
    type : 'text',
    placeholder : 'Enter your phone number',
  },
  {
    label : 'Notes',
    name : 'notes',
    componentType : 'textarea',
    placeholder : 'Enter any additional notes',
  },
];