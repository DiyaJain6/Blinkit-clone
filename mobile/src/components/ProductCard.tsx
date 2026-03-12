import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';

interface ProductProps {
  product: {
    _id: string;
    title: string;
    image: string;
    price: number;
    quantityOption: string;
  };
  onAdd?: () => void;
  onRemove?: () => void;
  quantity?: number;
}

const ProductCard = ({ product, onAdd, onRemove, quantity = 0 }: ProductProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.8} style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.deliveryBadge}>
          <Text style={styles.deliveryText}>⏱ 12 MINS</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.weight}>{product.quantityOption}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}><Text style={styles.priceSymbol}>₹</Text>{product.price}</Text>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.qtyBtn} onPress={onRemove}>
              <Minus color="#fff" size={14} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={onAdd}>
              <Plus color="#fff" size={14} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 10, // matching --radius-md
    padding: 8,
    marginRight: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE', // matching --border
  },
  imageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  deliveryText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#333',
  },
  info: {
    height: 55,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 13, // matching 0.85rem
    fontWeight: '700',
    color: '#1C1C1C', // matching --text-main
    lineHeight: 16,
  },
  weight: {
    fontSize: 11, // matching 0.75rem
    color: '#666666', // matching --text-muted
    marginTop: 2,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1C1C1C',
  },
  priceSymbol: {
    fontSize: 11,
  },
  addButton: {
    backgroundColor: '#f7fff9',
    borderWidth: 1,
    borderColor: '#0C831F', // matching --primary
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#0C831F',
    fontSize: 12,
    fontWeight: '800',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C831F',
    borderRadius: 8,
    minWidth: 70,
    justifyContent: 'space-between',
  },
  qtyBtn: {
    padding: 6,
  },
  qtyText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default ProductCard;
