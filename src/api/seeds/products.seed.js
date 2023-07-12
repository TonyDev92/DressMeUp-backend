const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('../models/product.model');
const { insertMany } = require('../models/user.model');
const DB_URL = process.env.DB_URL;
const arrayProducts = [
    {
        name : "Jersey",
        price : "64.99",
        description: "Jersey Babiery Blue Escarlata",
        class : "Mujer",
        image : "https://res.cloudinary.com/dpekebzbd/image/upload/v1687368747/DressMeUP/fekqwbrvarqsxuilix4x.png"
    },
    {
        name : "Set de Anillos",
        price: "34.95",
        description: "Colección de anillos temple of love",
        class : "Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663409/DressMeUP/hand-792061_1280_hs7sd1.jpg"
    },
    {
        name: "Vestido",
        price: "79.99",
        description: "Vestido Bruno Cassari colección primavera",
        class: "Mujer",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1687368159/DressMeUP/d3olcmkphdsj6hrxwpl6.png"
    },
    {
        name: "Pulsera Gold",
        price: "341",
        description: "Pulsera Amatto Gold Dream",
        class: "Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663396/DressMeUP/gold-665722_1280_n9mtfl.jpg"
    },
    {
        name: "Zapatos de Tacón",
        price: "124.95",
        description: "Zapatos de tacón Panther Gold",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663436/DressMeUP/feet-1839102_1280_cojb0c.jpg"
    },
    {
        name: "Anillo de oro blanco",
        price: "1999.99",
        description: "Anillo wild panther color white esmeralda",
        class: "Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663445/DressMeUP/cartier-1137400_1280_b5pnuk.jpg"
    },
    {
        name: "Conjunto Casual",
        price: "235.45",
        description: "Conjunto Tim Robinson Cazadora , jeans y polo. Black & White edition.",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663474/DressMeUP/man-2911327_1280_tkhj46.jpg"
    },
    {
        name: "Deportivas Casual",
        price: "59.99",
        description: "Deportivas slim color gold-white",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663415/DressMeUP/woman-3857758_1280_y2kje8.jpg"
    },
    {
        name: "Botas Militares",
        price: "369.99",
        description: "Botas Jonh monnahawk edición limitada",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663397/DressMeUP/woman-2179062_1280_hcozvg.jpg"
    },
    {
        name: "Zapatillas Sport",
        price: "64.95",
        description: "Zapatillas Lara Felguera edición rose",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663440/DressMeUP/black-4572125_1280_oekl28.jpg"
    },
    {
        name: "Brazalete",
        price: "599.99",
        description: "Brazalete Anna D'agostino purple-haze",
        class:"Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663412/DressMeUP/bracelet-640132_1280_pyegdp.jpg"
    },
    {
        name: "Gafas de sol",
        price: "49.95",
        description: "Gafas de sol de alta gama con filtrado de luz azul",
        class: "Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1687368307/DressMeUP/huxaisf846yo20jpe5bw.png"
    },
    {
        name: "Sudadera",
        price: "39.99",
        description: "Sudadera Carla de simone Grey-Black",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663461/DressMeUP/man-515518_1280_qrcj8t.jpg"
    },
    {
        name: "Cazadora",
        price: "289.95",
        description: "Cazadora Antonio Moretti ryder edition",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663454/DressMeUP/man-1866572_1280_kjcwvn.jpg",
    },
    {
        name: "Traje",
        price: "349.99",
        description: "Traje a cuadros Babieri colección summer",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688660583/DressMeUP/vo0z07e5chvlbzo1iaoy.jpg"
    },
    {
        name: "Traje Sport",
        price: "165.49",
        description: "Traje Antonio Moretti sport grey & blue",
        class:"Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663451/DressMeUP/man-3049894_1280_wxzbgi.jpg"
    },
    {
        name:"Chaqueta",
        price: "89.95",
        description: "Chaqueta Carla de simone dark winter",
        class: "Mujer",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1686751029/DressMeUP/woman-1063100_1280_vbjnxd.png"
    },
    {
        name: "Zapatillas",
        price: "58.99",
        description: "Zapatillas Anna D'Agostino purple-nigth",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663409/DressMeUP/shoes-2425122_1280_gfjsg5.jpg"
    },
    {
        name: "Botas de trabajo",
        price: "79.85",
        description: "Botas blue-montain cuero",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663448/DressMeUP/work-boots-889816_1280_gbyrjw.jpg"
    },
    {
        name: "Top",
        price: "39.99",
        description: "Top Cassandra Grimaldi olive blue edición wild",
        class: "Mujer",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1687368680/DressMeUP/pewcrscfok4wjfr6np4t.png"
    },
    {
        name: "Zapatillas",
        price: "45.95",
        description: "Zapatillas Bruno Roland edición superhero",
        class: "Calzado",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663409/DressMeUP/shoes-1433925_1280_lwxegx.jpg"
    },
    {
        name: "Jersey",
        price: "54.45",
        description: "Jersey Bruno Cassari crean-white",
        class: "Mujer",
        image:"https://res.cloudinary.com/dpekebzbd/image/upload/v1687368593/DressMeUP/lr9h1pkimci4s9mxsn4y.png"
    },
    {
        name: "Sombrero",
        price: "39.99",
        description: "Sombrero Tom Collins Earl-Gray",
        class:"Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1686837641/DressMeUP/vet2xxpl1ond0oswe7q2.png"
    },
    {
        name: "Conjunto",
        price: "39.95",
        description: "Conjunto Bruno Simone pink-grey",
        class: "Mujer",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663519/DressMeUP/woman-2593366_1280_gocfwl.jpg"
    },
    {
        name: "Jeans",
        price: "34.95",
        description: "Jeans Bruno Roland edición sport",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663497/DressMeUP/man-815795_1280_zxhx4s.jpg"
    },
    {
        name: "Camisa",
        price: "45.95",
        description: "Camisa Anna D'Agostino Blue-white",
        class: "Mujer",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663513/DressMeUP/women-8071346_1280_uwvu6o.jpg"
    },
    {
        name: "Reloj de pulsera",
        price: "159",
        description: "Reloj Tom collins edición platino",
        class: "Complementos",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663474/DressMeUP/wrist-watch-2159351_1280_kmoxvu.jpg"
    },
    {
        name: "Corsé",
        price: "299.99",
        description: "Corsé Bruno Simone pink-passion",
        class: "Mujer",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663528/DressMeUP/fashion-3179178_1280_boz58j.jpg"
    },
    {
        name : "Blazer",
        price: "349.95",
        description: "Blazer Carla de Simone Beige",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663490/DressMeUP/fashion-1844722_1280_qsgbfq.jpg"
    },
    {
        name: "Camisa",
        price: "49.99",
        description : "Camisa Antonio Moretti red & blue",
        class: "Hombre",
        image: "https://res.cloudinary.com/dpekebzbd/image/upload/v1688663469/DressMeUP/fashion-4951644_1280_uoucyo.jpg"
    }
]

mongoose.connect(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(async () => {
    const allProducts = await Product.find()
    if(allProducts.length > 0){
        await Product.collection.drop();
        console.log("Deleted Products");
    }
}).catch((error) => console.log(error)).then( async () => {
    const productMap = arrayProducts.map((product) => new Product(product))
    await Product.insertMany(productMap)
    console.log("Products inserted correctly");
}).catch((error) => console.log(`Error to insert products: ${error}`)).finally(() => mongoose.disconnect());