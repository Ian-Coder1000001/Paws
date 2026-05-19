// Save this as create-admin-simple.js (replace the one in your project root)
// Run with: node create-admin-simple.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ✅ UPDATED: New MongoDB cluster URI
const MONGODB_URI = 'mongodb+srv://iansheezy1:Incorrect4321@cluster0.oawl32d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const ADMIN_EMAIL = 'admin@pawsomepals.com';

// ✅ UPDATED: New admin password — change this to whatever you want
const ADMIN_PASSWORD = 'Admin@2024@';

// User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  image: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

async function createAdminUser() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const User = mongoose.model('User', UserSchema);

    console.log(`\n🔍 Looking for admin user with email: ${ADMIN_EMAIL}`);
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    if (existingAdmin) {
      console.log('👤 Admin user found, resetting password...');

      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      existingAdmin.isAdmin = true;
      existingAdmin.name = existingAdmin.name || 'Admin';

      await existingAdmin.save();
      console.log('✅ Admin password reset successfully!');
      console.log(`   ID: ${existingAdmin._id}`);
    } else {
      console.log('➕ No existing admin found, creating new admin user...');

      const adminUser = await User.create({
        email: ADMIN_EMAIL,
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
        isAdmin: true,
        isActive: true
      });

      console.log('✅ Admin user created successfully!');
      console.log(`   ID: ${adminUser._id}`);
    }

    // Verify
    console.log('\n🔎 Verifying admin user...');
    const verifyAdmin = await User.findOne({ email: ADMIN_EMAIL });
    console.log('✅ Admin user details:');
    console.log(`   Email:            ${verifyAdmin.email}`);
    console.log(`   Name:             ${verifyAdmin.name}`);
    console.log(`   Role:             ${verifyAdmin.role}`);
    console.log(`   isAdmin:          ${verifyAdmin.isAdmin}`);
    console.log(`   Has Password:     ${!!verifyAdmin.password}`);
    console.log(`   Password Length:  ${verifyAdmin.password ? verifyAdmin.password.length : 0}`);

    console.log('\n🎉 SUCCESS! You can now login with:');
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('   URL:      http://localhost:3000/admin');

    const totalUsers = await User.countDocuments();
    console.log(`\n📊 Total users in database: ${totalUsers}`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code === 11000) {
      console.error('   Duplicate key error — there might be an index issue');
    }
    console.error('\nFull error:', error);
  } finally {
    console.log('\n🔌 Disconnecting from MongoDB...');
    await mongoose.disconnect();
    console.log('✅ Disconnected');
    process.exit(0);
  }
}

console.log('🛠  Admin Password Reset Script');
console.log('================================\n');
createAdminUser();