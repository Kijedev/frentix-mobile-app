import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING = 20;

type Card = {
    name: string;
    number: string;
    color: string;
};

type Bank = {
    name: string;
    slug: string;
};

const Bank = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState("");
    const [showBanks, setShowBanks] = useState(false);
    const [loadingBanks, setLoadingBanks] = useState(false);
    const [bankLogo, setBankLogo] = useState<string>("");
    const [cardNumber, setCardNumber] = useState("");
    const [cards, setCards] = useState<Card[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newBank, setNewBank] = useState("");
    const [newCardNumber, setNewCardNumber] = useState("");

    const maskCard = (num: string) =>
        "**** **** **** " + num.slice(-4);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                setLoadingBanks(true);
                const response = await fetch(
                    "https://supermx1.github.io/nigerian-banks-api/data.json"
                );
                const data = await response.json();
                setBanks(data);
            } catch (error) {
                console.log("Error fetching banks:", error);
            } finally {
                setLoadingBanks(false);
            }
        };

        fetchBanks();
    }, []);

    const handleCardSelect = (card: Card) => {
        setSelectedBank(card.name);
        setCardNumber(card.number);
    };

    useEffect(() => {
        const loadCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem("user_cards");
                if (storedCards) {
                    setCards(JSON.parse(storedCards));
                }
            } catch (error) {
                console.log("Error loading cards:", error);
            }
        };

        loadCards();
    }, []);

    const addCard = async () => {
        if (!newBank || newCardNumber.replace(/\s/g, "").length < 16) {
            alert("Please enter valid card details");
            return;
        }

        const newCard: Card = {
            name: newBank,
            number: newCardNumber,
            color: "#7C3AED",
        };

        const updatedCards = [...cards, newCard];

        setCards(updatedCards);

        await AsyncStorage.setItem("user_cards", JSON.stringify(updatedCards));

        setNewBank("");
        setNewCardNumber("");
        setModalVisible(false);
    };

    const formatCardNumber = (num: string) => {
        return num
            .replace(/\s?/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
    };

    const openModal = () => {
        Keyboard.dismiss();
        setModalVisible(true);
    };

    return (
        <>
            <Text className="font-inter text-white mt-6 mb-4 text-xl">
                Add Bank Card
            </Text>
            <TouchableOpacity
                onPress={() => openModal()}
                className="border border-[#fff]/20 bg-[#181818] border-dotted rounded-2xl p-6 items-center justify-center"
            >
                <Ionicons name="add-circle-outline" size={32} color="#fff" />
                <Text className="text-white/50 mt-2 font-inter">Add Bank Card</Text>
            </TouchableOpacity>

            {cards.length > 0 && (
                <Animated.FlatList
                    data={cards}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH + SPACING}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingHorizontal: SPACING }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * (CARD_WIDTH + SPACING),
                            index * (CARD_WIDTH + SPACING),
                            (index + 1) * (CARD_WIDTH + SPACING),
                        ];

                        const rotate = scrollX.interpolate({
                            inputRange,
                            outputRange: ["8deg", "0deg", "-8deg"],
                            extrapolate: "clamp",
                        });

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.9, 1, 0.9],
                            extrapolate: "clamp",
                        });

                        return (
                            <TouchableOpacity onPress={() => handleCardSelect(item)}>
                                <Animated.View
                                    style={{
                                        width: CARD_WIDTH,
                                        marginRight: SPACING,
                                        backgroundColor: item.color,
                                        transform: [{ rotate }, { scale }],
                                    }}
                                    className="rounded-2xl p-8 w-full h-48 flex justify-center items-center"
                                >
                                    <Text className="font-inter text-2xl text-white font-bold">
                                        {item.name}
                                    </Text>
                                    <Text className='text-white/50 mt-4'>{maskCard(item.number)}</Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}

            {/* Modal */}
            <Modal
                transparent
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-end bg-black/50">

                    <View className="bg-[#141414] rounded-t-3xl p-6 h-[50%]">

                        <View className="w-12 h-1.5 bg-gray-500 rounded-full self-center mb-4" />

                        <Text className="text-white text-lg font-semibold mb-4">
                            Add Bank Card
                        </Text>

                        <Text className="text-white mb-2">Bank Name</Text>
                        <TouchableOpacity
                            onPress={() => setShowBanks(!showBanks)}
                            className="bg-[#0C0C0C] rounded-xl px-4 py-4 flex-row items-center mb-4"
                        >
                            <Ionicons name="business-outline" size={18} color="#888" />
                            <Text className="text-white ml-3 flex-1">
                                {newBank || "Select Bank"}
                            </Text>
                        </TouchableOpacity>

                        <Text className="text-white mb-2">Card Number</Text>
                        <TextInput
                            value={newCardNumber}
                            onChangeText={(text) =>
                                setNewCardNumber(formatCardNumber(text))
                            }
                            keyboardType="numeric"
                            className="bg-[#0C0C0C] text-white rounded-xl px-4 py-3 mb-4"
                        />

                        <View className="flex-row justify-end gap-4 mt-2">
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                className="px-4 py-2 rounded-xl border border-white/5"
                            >
                                <Text className="text-white">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={addCard}
                                className="px-4 py-2 rounded-xl bg-[#722cebff]"
                            >
                                <Text className="text-white font-semibold">Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Transfer Money */}
            <Text className="font-inter text-white mt-8 mb-4 text-xl font-medium">
                Transfer Money to
            </Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="mt-5"
            >
                <View className="space-y-4">
                    <View>
                        <Text className="font-inter text-white mb-4">Bank Name</Text>

                        <TouchableOpacity
                            onPress={() => setShowBanks(!showBanks)}
                            className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center"
                            style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}
                        >
                            <Ionicons name="business-outline" size={18} color="#888" />
                            <Text className="text-white ml-3 flex-1">
                                {selectedBank || "Select Bank"}
                            </Text>
                        </TouchableOpacity>

                        {showBanks && (
                            <View
                                className="bg-[#0C0C0C] rounded-xl mt-2 absolute z-50 top-[90%] w-full"
                                style={{ maxHeight: 200 }}
                            >
                                <ScrollView showsVerticalScrollIndicator>
                                    {banks.map((bank, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setNewBank(bank.name);
                                                setShowBanks(false);
                                            }}
                                            className="px-4 py-3 flex-row items-center border-b border-[#2A2A2A]"
                                        >
                                            <Image
                                                source={{
                                                    uri: `https://supermx1.github.io/nigerian-banks-api/logos/${bank.slug}.png`
                                                }}
                                                className="w-8 h-8 mr-3"
                                            />
                                            <Text className="text-white">{bank.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    <Text className="font-inter text-white mb-4 mt-6">Card Number</Text>
                    <View
                        className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center"
                        style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}
                    >
                        <Ionicons name="card-outline" size={18} color="#888" />

                        <TextInput
                            value={newCardNumber}
                            onChangeText={(text) =>
                                setNewCardNumber(formatCardNumber(text))
                            }
                            keyboardType="numeric"
                            className="text-white ml-3 flex-1 py-2"
                        />
                    </View>

                    <Text className="font-inter text-white mb-4 mt-6">Amount</Text>

                    <View
                        className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center"
                        style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}
                    >
                        <Ionicons name="cash-outline" size={18} color="#888" />

                        <TextInput
                            placeholder="Enter Amount"
                            placeholderTextColor="#666"
                            keyboardType="numeric"
                            className="text-white ml-3 flex-1 py-2"
                        />
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} className="mt-10">
                    <LinearGradient
                        colors={["#7C3AED", "#A855F7"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4 rounded-full"
                        style={{
                            borderRadius: 12,
                            paddingVertical: 12,
                        }}
                    >
                        <Text className="font-inter text-white text-center font-semibold text-base">
                            Transfer
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    )
}

export default Bank