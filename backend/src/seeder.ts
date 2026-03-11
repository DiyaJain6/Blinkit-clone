import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category';
import Product from './models/Product';

dotenv.config();

const categories = [
    { name: 'Paan Corner', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=360/da/cms-assets/cms/product/0d189b7c-1533-4d20-8351-d08268fada28.png' },
    { name: 'Dairy, Bread & Eggs', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/dd576670-4b35-4cba-94db-c3d3f472df6b.png?bg_token=color.background.quaternary' },
    { name: 'Fruits & Vegetables', image: 'https://cdn.grofers.com/da/cms-assets/cms/product/93605c12-c555-4268-9ecc-11df65bf95cc.jpg' },
    { name: 'Cold Drinks & Juices', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=540/app/images/category/cms_images/icon/332_1680269009421.png' },
    { name: 'Snacks & Munchies', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/a85ad75d-687e-47e5-bd38-aa27e12436ca.png?bg_token=color.background.quaternary' },
    { name: 'Breakfast & Instant Food', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/9336db52-095d-41d5-8412-894695546274.png?bg_token=color.background.quaternary' },
    { name: 'Sweet Tooth', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/57fb9aa4-219d-4058-acab-dd0dffe7ce0a.png?bg_token=color.background.quaternary' },
    { name: 'Bakery & Biscuits', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-8_4.png' },
    { name: 'Tea, Coffee & Milk Drinks', image: 'https://cdn.dribbble.com/userupload/10510399/file/original-2ac91323fedcf2898fa1e20c126258cf.jpg?resize=752x&vertical=center' },
    { name: 'Atta, Rice & Dal', image: 'https://image.cdn.shpy.in/344986/cat/1705405028411_350633_cat.png?format=webp' },
    { name: 'Masala, Oil & More', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png' },
    { name: 'Sauces & Spreads', image: 'https://m.media-amazon.com/images/I/61nFGc+r+PS._AC_UF894,1000_QL80_.jpg' },
    { name: 'Chicken, Meat & Fish', image: 'https://media.istockphoto.com/id/1010068522/photo/salmon-beef-pork-and-chicken.jpg?s=612x612&w=0&k=20&c=XjN_4ejnGnjnE14oRogyFNEknklAjaZiHamNRqrVz5k=' },
    { name: 'Organic & Healthy Living', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNaBT4bkJCEMgsEYS91NWaH31JQ8tBRV2G-g&s' },
    { name: 'Baby Care', image: 'https://m.media-amazon.com/images/I/61ReM-0zslL.jpg' },
    { name: 'Pharma & Wellness', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-16.png' },
    { name: 'Cleaning Essentials', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/hbdvwu6nwbeei1qjmdtu' },
    { name: 'Home & Office', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSuxW7tXFKH-H1ae_kjdhGJ6r5qRniuh1SQ&s' },
    { name: 'Personal Care', image: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/10/J52Qi1B8_3cb7afdfd0434935afb4af78c49d138f.jpg' },
    { name: 'Pet Care', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRod9GzqJGGC8wrmryO1QwS3Ut-g9Ro2Ji25dpMtyFuq8nxOA5COB4NS4rgFc1WwUL3p2RhTjeVCV3UcdSAXyVRRcUv2yevkiTjfsztC0Ko_KX9GqHZUm_BuPX6g-4mTLNMXQ&usqp=CAc' },
];

const products = [
    {
        title: 'Amul Taaza Toned Fresh Milk',
        description: 'Fresh and nutritious toned milk from Amul.',
        image: 'https://fpsstore.in/cdn/shop/products/148715-2_2-amul-toned-milk.png?v=1641466845',
        price: 27,
        quantityOption: '500 ml',
        categoryName: 'Dairy, Bread & Eggs',
        inventoryCount: 50
    },
    {
        title: 'Nandini Goodlife Toned Milk',
        description: 'Long life toned milk, no boiling required.',
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/160a.jpg',
        price: 28,
        quantityOption: '500 ml',
        categoryName: 'Dairy, Bread & Eggs',
        inventoryCount: 30
    },
    {
        title: 'Fresh Potato (Aloo)',
        description: 'Farm fresh high quality potatoes.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5Wa7l-EWPEtIbsJ1oSDsVU7cjx7g1KdDGA&s',
        price: 35,
        quantityOption: '1 kg',
        categoryName: 'Fruits & Vegetables',
        inventoryCount: 100
    },
    {
        title: 'Coca-Cola Soft Drink',
        description: 'Original Taste refreshing cold drink.',
        image: 'https://jagsfresh-bucket.s3.amazonaws.com/media/package/img_one/2020-10-17/Coca_Cola_Soft_Drink_bottle_2l.jpg',
        price: 45,
        quantityOption: '750 ml',
        categoryName: 'Cold Drinks & Juices',
        inventoryCount: 200
    },
    {
        title: 'Thums Up Soft Drink',
        description: 'Strong refreshing cold drink.',
        image: 'https://www.jiomart.com/images/product/original/491297310/thums-up-250-ml-product-images-o491297310-p491297310-0-202412121933.jpg?im=Resize=(420,420)',
        price: 40,
        quantityOption: '750 ml',
        categoryName: 'Cold Drinks & Juices',
        inventoryCount: 150
    },
    {
        title: 'Fresh Onion',
        description: 'Crisp and flavorful onions.',
        image: 'https://m.media-amazon.com/images/I/51DJ-9xkuQL.jpg',
        price: 30,
        quantityOption: '1 kg',
        categoryName: 'Fruits & Vegetables',
        inventoryCount: 80
    },
    {
        title: 'Maggi 2-Minute Noodles',
        description: 'The classic instant noodles.',
        image: 'https://one2shops.com/cdn/shop/products/maggi_372x.jpg?v=1625136494',
        price: 14,
        quantityOption: '70 g',
        categoryName: 'Breakfast & Instant Food',
        inventoryCount: 120
    },
    {
        title: "Lay's Classic Salted Chips",
        description: 'Crispy and salty potato chips.',
        image: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-470,ar-1021-1021,pr-true,f-auto,,q-40,dpr-2/cms/product_variant/d35f2c9c-e618-490f-8433-a99986cbbc2c/Lay-s-Classic-Salted-Potato-Chips-Combo-.jpeg',
        price: 20,
        quantityOption: '50 g',
        categoryName: 'Snacks & Munchies',
        inventoryCount: 90
    },
    {
        title: 'Harvest Gold White Bread',
        description: 'Soft and fresh white bread.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2kA_GzuQpQBeqfZRQgIYC0M1QwCW8t9yZg&s',
        price: 45,
        quantityOption: '400 g',
        categoryName: 'Dairy, Bread & Eggs',
        inventoryCount: 40
    },
    {
        title: 'Amul Masti Buttermilk',
        description: 'Refreshing and spiced buttermilk.',
        image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/vczs3u8qr1vgyzoums3h',
        price: 15,
        quantityOption: '200 ml',
        categoryName: 'Dairy, Bread & Eggs',
        inventoryCount: 60
    }
];

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/blinkit-clone';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Seed Categories
        const createdCategories = await Category.insertMany(categories);
        console.log(`${createdCategories.length} categories seeded.`);

        // Map products to their category IDs
        const productsData = products.map(p => {
            const category = createdCategories.find(c => c.name === p.categoryName);
            return { ...p, category: category?._id };
        });

        // Seed Products
        await Product.insertMany(productsData);
        console.log(`${productsData.length} products seeded.`);

        console.log('Database Seeding Completed!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDB();
