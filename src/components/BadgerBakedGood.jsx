import { Text, View, Image, Button } from "react-native";

export default function BadgerBakedGood(props) {
    const message = props.data["upperLimit"] > 0
        ? `You can order up to ${props.data["upperLimit"]} items!`
        : "You can order unlimited items!"

    return <View style={{
        //flex: 1,
        justifyContent: "center",
        alignItems: "center" }}
        >
            <Image
                style={{
                    width: 200,
                    height: 200
                }}
                source={{
                    uri: `${props.data["imgSrc"]}`
                }}
            />
            <Text style={{ fontWeight: 500, fontSize: 30 }}>{props.data["name"]}</Text>
            <Text style={{ fontSize: 20 }}>${props.data["price"].toFixed(2)}</Text>
            <Text style={{ fontSize: 20 }}>{message}</Text>
            <View style={{ 
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'row'
                }}>
                <Button title="-" onPress={props.handleRemoveItem} disabled={props.goodsAmounts[props.currentItem] === 0}/>
                <Text>{props.goodsAmounts[props.currentItem]}</Text>
                <Button title="+" onPress={props.handleAddItem} disabled={props.goodsAmounts[props.currentItem] >= props.data["upperLimit"] && props.data["upperLimit"] !== -1}/>
            </View>
        </View>
}
