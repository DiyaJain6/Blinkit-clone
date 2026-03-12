import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ShoppingBag, MapPin, CreditCard, Wallet, Smartphone, Banknote, Trash2, Plus, Minus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const CartScreen = () => {
  // Static placeholder data to match the "as it is" look
  const cartItems: any[] = [
    {
      product: '1',
      title: 'Amul Taaza Toned Fresh Milk',
      image: 'https://cdn.grofers.com/app/images/products/sliding_image/Default_Image.jpg',
      price: 54,
      quantity: 2,
    }
  ];

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyContent}>
          <Image 
            source={{ uri: 'https://cdn.grofers.com/assets/checkout/empty-cart.png' }} 
            style={styles.emptyImg}
          />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <TouchableOpacity style={styles.startShoppingBtn}>
            <Text style={styles.startShoppingText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const itemTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalToPay = itemTotal + 17;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Cart Items Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items in Cart</Text>
          {cartItems.map((item) => (
            <View key={item.product} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImg} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
              <View style={styles.itemControls}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity style={styles.qtyBtn}>
                    <Minus color="#fff" size={14} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.qtyBtn}>
                    <Plus color="#fff" size={14} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Address Section */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.cardTitle}>Delivery Address</Text>
            <TouchableOpacity><Text style={styles.changeBtn}>Change</Text></TouchableOpacity>
          </View>
          <View style={styles.addressPreview}>
            <View style={styles.addrTag}><Text style={styles.addrTagText}>Home</Text></View>
            <Text style={styles.addrText}>123, Street Name, City</Text>
          </View>
        </View>

        {/* Payment Method Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <TouchableOpacity style={[styles.paymentItem, styles.paymentItemActive]}>
            <Banknote color="#0C831F" size={20} />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
            <View style={styles.radioActive} />
          </TouchableOpacity>
        </View>

        {/* Bill Details Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billValue}>₹{itemTotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Charge</Text>
            <Text style={styles.billValue}>₹15</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Handling Charge</Text>
            <Text style={styles.billValue}>₹2</Text>
          </View>
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>₹{totalToPay}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1C1C1C',
    letterSpacing: -0.5,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemControls: {
    alignItems: 'flex-end',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C831F',
    borderRadius: 6,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    marginHorizontal: 8,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeBtn: {
    color: '#0C831F',
    fontSize: 13,
    fontWeight: '700',
  },
  addressPreview: {
    marginTop: 4,
  },
  addrTag: {
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  addrTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#666',
  },
  addrText: {
    fontSize: 13,
    color: '#666',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
  },
  paymentItemActive: {
    borderColor: '#0C831F',
    backgroundColor: '#EAF5EF',
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  radioActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0C831F',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 14,
    color: '#666',
  },
  billValue: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1C1C1C',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#1C1C1C',
  },
  placeOrderBtn: {
    backgroundColor: '#0C831F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyImg: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1C1C1C',
    textAlign: 'center',
    marginBottom: 24,
  },
  startShoppingBtn: {
    backgroundColor: '#0C831F',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  startShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default CartScreen;
