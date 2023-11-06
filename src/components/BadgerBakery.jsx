import { Text, View, Button, Alert } from "react-native";
import { useEffect, useState, useMemo, useCallback } from 'react';
import BadgerBakedGood from "./BadgerBakedGood";

export default function BadgerBakery() {
    const [bakedGoods, setBakedGoods] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [goodsAmounts, setGoodsAmounts] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);

    // Fetch Baked Goods Data
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw7/goods", {
            headers: {
                "X-CS571-ID": 'bid_b12898bda46ac66e7703c0762de9def4c784a66f024e5b5de19d6da1de871384'
            }
        })
        .then(res => res.json())
        .then(data => {
            setBakedGoods(Object.keys(data).map((key) => ({ key: key, data: data[key] }) ));
        })
    }, []);

    useEffect(() => {
        setGoodsAmounts(bakedGoods.map((good) => 0));
    }, [bakedGoods])

    // Store Baked Goods Components
    const bakedGoodsComponents = useMemo(() => 
        bakedGoods.map((good, index) => <BadgerBakedGood
            id={good["key"]}
            data={good["data"]}
            handleAddItem={() => handleAddItem(index)}
            handleRemoveItem={() => handleRemoveItem(index)}
            goodsAmounts={goodsAmounts}
            currentItem={index}
        />), [bakedGoods, goodsAmounts]
    );

    // Previous and Next Button Handlers
    const handlePrevious = () => {
        setCurrentItem((currentItem) => currentItem - 1)
    };

    const handleNext = () => {
        setCurrentItem((currentItem) => currentItem + 1)
    };

    // Remove and Add Button Handlers
    const handleRemoveItem = (index) => {
        if (index >= 0 && index < bakedGoods.length) {
            if (goodsAmounts[index] > 0) {
                setGoodsAmounts((prevGoodsAmounts) => {
                    const updatedGoodsAmounts = [...prevGoodsAmounts];
                    updatedGoodsAmounts[index] -= 1;
                    return updatedGoodsAmounts;
                });
            }
        }
        setOrderTotal((prevOrderTotal) => prevOrderTotal - bakedGoods[index].data.price);
    };
    
    const handleAddItem = (index) => {
        if (index >= 0 && index < bakedGoods.length) {
            setGoodsAmounts((prevGoodsAmounts) => {
                const updatedGoodsAmounts = [...prevGoodsAmounts];
                updatedGoodsAmounts[index] += 1;
                return updatedGoodsAmounts;
            });
        }
        setOrderTotal((prevOrderTotal) => prevOrderTotal + bakedGoods[index].data.price);
    };

    const handleOrderPlaced = () => {
        const numItems = goodsAmounts.reduce((acc, amount) => acc + amount, 0);
        Alert.alert(
            'Order Confirmed!',
            `Order Confirmed! Your order contains ${numItems} item(s) and costs $${orderTotal.toFixed(2)}!`,
            [
              {
                text: 'OK',
                onPress: () => {
                    setCurrentItem(0);
                    setGoodsAmounts(Array(bakedGoods.length).fill(0));
                    setOrderTotal(0);
                },
              },
            ]
          );

    }

    console.log(goodsAmounts);

    return (
        <View style={{ justifyContent: "center",
        alignItems: "center" }}>
            
            <Text style={{ fontSize: 30 }}>Welcome to Badger Bakery!</Text>
            <View style={{ 
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'row'
                }}>
                <Button title="Previous" onPress={handlePrevious} disabled={currentItem === 0}></Button>
                <Button title="Next" onPress={handleNext} disabled={currentItem === bakedGoodsComponents.length - 1}></Button>
            </View>
            {bakedGoods.length ? bakedGoodsComponents[currentItem] : <></>}
            <Text>Order Total: ${orderTotal.toFixed(2)}</Text>
            <Button title="Place Order" onPress={handleOrderPlaced} disabled={orderTotal === 0}/>
        </View>
    )
}

//<Button title="-" onPress={handleRemoveItem} disabled={goodsAmounts[currentItem] === 0}/>
//<Text>{goodsAmounts[currentItem]}</Text>
//<Button title="+" onPress={handleAddItem} disabled={addItemDisabled}/>