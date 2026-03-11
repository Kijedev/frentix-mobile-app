import PatternImage from "@/assets/images/pattern.png";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    GestureResponderEvent,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    PanResponder,
    PanResponderGestureState,
    Platform,
    ScrollView,
    StyleProp,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import { SvgUri } from "react-native-svg";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const SPACING = 20;

type Card = {
    id: string;
    name: string;
    number: string;
    gradient: [string, string];
    backgroundImage?: string;
};

type Bank = {
    id: string;
    order: number;
    title: string;
    categories: string[];
    route: string;
    url: string;
    ticker: string;
};

const CARD_GRADIENTS = [
    ["#6366F1", "#8B5CF6"],
    ["#000000", "#000000"],
    ["#10B981", "#059669"],
    ["#F59E0B", "#D97706"],
    // ["#3B82F6", "#2563EB"],
];

const Bank = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const swipe = useRef<Animated.ValueXY>(new Animated.ValueXY()).current;

    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [showBanks, setShowBanks] = useState<boolean>(false);
    const [loadingBanks, setLoadingBanks] = useState<boolean>(false);

    const [bankLogo, setBankLogo] = useState<string>("");

    const [cardNumber, setCardNumber] = useState<string>("");

    const [cards, setCards] = useState<Card[]>([]);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [newBank, setNewBank] = useState<string>("");
    const [newCardNumber, setNewCardNumber] = useState<string>("");

    /* ---------------- MASK CARD NUMBER ---------------- */

    const maskCard = (num: string): string => {
        return "**** **** **** " + num.slice(-4);
    };

    /* ---------------- FETCH BANKS ---------------- */

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                setLoadingBanks(true);

                const response = await fetch(
                    "https://api.nigerianbanklogos.xyz"
                );

                const data: Bank[] = await response.json();

                setBanks(data);
            } catch (error) {
                console.log("Error fetching banks:", error);
            } finally {
                setLoadingBanks(false);
            }
        };

        fetchBanks();
    }, []);

    /* ---------------- LOAD SAVED CARDS ---------------- */

    useEffect(() => {
        const loadCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem("user_cards");

                if (storedCards) {
                    const parsedCards: Card[] = JSON.parse(storedCards);
                    setCards(parsedCards);
                }
            } catch (error) {
                console.log("Error loading cards:", error);
            }
        };

        loadCards();
    }, []);

    /* ---------------- SELECT CARD (AUTOFILL FORM) ---------------- */

    const handleCardSelect = (card: Card): void => {
        setSelectedBank(card.name);
        setCardNumber(card.number);

        // move selected card to front
        setCards((prev) => [
            card,
            ...prev.filter((c) => c.id !== card.id),
        ]);
    };

    /* ---------------- ADD NEW CARD ---------------- */

    const addCard = async (): Promise<void> => {
        if (!newBank || newCardNumber.replace(/\s/g, "").length < 16) {
            alert("Please enter valid card details");
            return;
        }

        // pick a random gradient for THIS card
        const randomGradient =
            CARD_GRADIENTS[Math.floor(Math.random() * CARD_GRADIENTS.length)];

        const newCard: Card = {
            id: Date.now().toString(),
            name: newBank,
            number: newCardNumber,
            gradient: getRandomGradient(),
        };

        const updatedCards: Card[] = [...cards, newCard];

        setCards(updatedCards);

        await AsyncStorage.setItem("user_cards", JSON.stringify(updatedCards));

        setNewBank("");
        setNewCardNumber("");
        setModalVisible(false);
    };

    const getRandomGradient = (): [string, string] => {
        // pick a random index
        const index = Math.floor(Math.random() * CARD_GRADIENTS.length);

        // safely assert the type to [string, string]
        return CARD_GRADIENTS[index] as [string, string];
    };

    /* ---------------- DELETE CARD ---------------- */

    const deleteCard = async (id: string): Promise<void> => {
        const filteredCards: Card[] = cards.filter((card) => card.id !== id);

        setCards(filteredCards);

        await AsyncStorage.setItem("user_cards", JSON.stringify(filteredCards));
    };

    /* ---------------- FORMAT CARD INPUT ---------------- */

    const formatCardNumber = (num: string): string => {
        return num
            .replace(/\s?/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
    };

    /* ---------------- OPEN MODAL ---------------- */

    const openModal = (): void => {
        Keyboard.dismiss();
        setModalVisible(true);
    };

    /* ---------------- SWIPE GESTURE ---------------- */

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,

            onPanResponderMove: (
                _: GestureResponderEvent,
                gesture: PanResponderGestureState
            ) => {
                swipe.setValue({ x: gesture.dx, y: gesture.dy });
            },

            onPanResponderRelease: (
                _: GestureResponderEvent,
                gesture: PanResponderGestureState
            ) => {
                if (gesture.dx < -120) {
                    swipeLeft();
                } else {
                    resetPosition();
                }
            },
        })
    ).current;

    /* ---------------- SWIPE CARD LEFT ---------------- */

    const swipeLeft = (): void => {
        Animated.timing(swipe, {
            toValue: { x: -width - 50, y: 0 },
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            nextCard();
            swipe.setValue({ x: 0, y: 0 });
        });
    };

    /* ---------------- RESET POSITION ---------------- */

    const resetPosition = (): void => {
        Animated.spring(swipe, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
        }).start();
    };

    /* ---------------- NEXT CARD ---------------- */

    const nextCard = (): void => {
        setCards((prev) => {
            if (prev.length <= 1) return prev;

            const first = prev[0];
            const rest = prev.slice(1);

            return [...rest, first];
        });
    };

    /* ---------------- PREVIOUS CARD ---------------- */

    const prevCard = (): void => {
        setCards((prev) => {
            if (prev.length <= 1) return prev;

            const last = prev[prev.length - 1];
            const rest = prev.slice(0, -1);

            return [last, ...rest];
        });
    };

    /* ---------------- ANIMATED STYLE ---------------- */

    const cardStyle: StyleProp<ViewStyle> = {
        transform: swipe.getTranslateTransform(),
    };

    return (
        <>
            <View className="flex-row items-center justify-between">
                <Text className="font-inter text-white mt-6 mb-4 text-xl">
                    Bank Card
                </Text>

                <TouchableOpacity
                    onPress={openModal}
                    className="flex-row items-center gap-2"
                >
                    <Ionicons name="add-circle-outline" size={24} color="#fff" />
                    <Text className="text-white font-inter">Add Bank Card</Text>
                </TouchableOpacity>
            </View>

            {/* CARD STACK */}
            {cards.length > 0 && (
                <View style={{ height: 220, marginTop: 10 }}>
                    {cards
                        .map((item: Card, index: number) => {
                            const isTopCard = index === 0;

                            const animatedStyle: StyleProp<ViewStyle> = isTopCard
                                ? {
                                    transform: swipe.getTranslateTransform(),
                                }
                                : {};

                            const baseCardStyle: StyleProp<ViewStyle> = {
                                position: "absolute",
                                width: "100%",
                                height: 180,
                                top: index * 12,
                                // left: index * 16,
                                // right: index * 16,
                                borderRadius: 20,
                                zIndex: cards.length - index,
                            };

                            return (
                                <Animated.View
                                    key={item.id}
                                    style={[baseCardStyle, animatedStyle]}
                                    {...(isTopCard ? panResponder.panHandlers : {})}
                                >
                                    <LinearGradient
                                        colors={item.gradient}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={{
                                            flex: 1,
                                            borderRadius: 20,
                                            padding: 0,
                                        }}
                                    >
                                        <ImageBackground
                                            source={PatternImage}
                                            style={{ flex: 1, padding: 20 }}
                                            imageStyle={{ borderRadius: 20, opacity: 0.4 }}
                                            resizeMode="cover"
                                        >
                                            <TouchableOpacity
                                                onPress={() => handleCardSelect(item)}
                                                className="relative"
                                            >
                                                <View className="flex-row gap-3 items-center">
                                                    {banks
                                                        .filter((bank) => bank.title === item.name)
                                                        .map((bank, index) => (
                                                            <SvgUri
                                                                height={32}
                                                                width={32}
                                                                uri={bank.route}
                                                            />
                                                        ))}

                                                    {/* Bank Name */}
                                                    <Text className="text-white font-inter text-xl font-bold">{item.name}</Text>
                                                </View>

                                                {/* Card Number */}
                                                <Text className="text-white font-inter font-semibold mt-2 absolute -bottom-32">
                                                    {maskCard(item.number)}
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => deleteCard(item.id)}
                                                style={{
                                                    position: "absolute",
                                                    right: 15,
                                                    top: 15,
                                                }}
                                                className="bg-red-500/80 rounded-full p-2"
                                            >
                                                <Ionicons name="trash-outline" size={20} color="white" />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </LinearGradient>
                                </Animated.View>
                            );
                        })
                        .reverse()}
                </View>
            )}

            {cards.length > 1 && (
                <View className="flex-row justify-end gap-6 mt-2">
                    <TouchableOpacity
                        onPress={nextCard}
                        className="flex-row gap-3 items-center"
                    >
                        <Text className="text-white">Swipe</Text>
                        <Ionicons name="repeat" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            )}

            {/* TRANSFER FORM */}
            <Text className="font-inter text-white mb-4 text-xl font-medium">
                Transfer Money to
            </Text>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="mt-5"
            >
                <View className="space-y-4">

                    {/* BANK SELECT */}
                    <View>
                        <Text className="font-inter text-white mb-4">Bank Name</Text>

                        <TouchableOpacity
                            onPress={() => setShowBanks(!showBanks)}
                            className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center mb-4"
                        >
                            <Ionicons name="business-outline" size={18} color="#888" />

                            <Text className="text-white ml-3 flex-1">
                                {selectedBank || "Select Bank"}
                            </Text>
                        </TouchableOpacity>

                        {showBanks && (
                            <View
                                className="bg-[#181818] rounded-xl mt-2 absolute z-50 top-[90%] w-full"
                                style={{ maxHeight: 200 }}
                            >
                                <ScrollView showsVerticalScrollIndicator>
                                    {banks.map((bank, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                setSelectedBank(bank.title);
                                                setShowBanks(false);
                                            }}
                                            className="px-4 py-3 flex-row gap-4 items-center border-b border-[#2A2A2A]"
                                        >
                                            <SvgUri
                                                height={32}
                                                width={32}
                                                uri={bank.route}
                                            />

                                            <Text className="text-white">{bank.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        )}
                    </View>

                    {/* CARD NUMBER */}

                    <Text className="font-inter text-white mb-4 mt-4">
                        Card Number
                    </Text>

                    <View
                        className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center"
                        style={{ paddingVertical: Platform.OS === "ios" ? 16 : 12 }}
                    >
                        <Ionicons name="card-outline" size={18} color="#888" />

                        <TextInput
                            value={cardNumber}
                            onChangeText={(text) =>
                                setCardNumber(formatCardNumber(text))
                            }
                            placeholder="Card Number"
                            placeholderTextColor="#666"
                            keyboardType="numeric"
                            className="text-white ml-3 flex-1 py-2"
                        />
                    </View>

                    {/* AMOUNT */}

                    <Text className="font-inter text-white mb-4 mt-6">
                        Amount
                    </Text>

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

                {/* TRANSFER BUTTON */}

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

            <Modal
                transparent
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                {/* <View className="flex-1 justify-end bg-black/50" /> */}
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: "flex-end" }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
                >
                    <View className="bg-[#0C0C0C] rounded-t-3xl p-6 h-[50%]">
                        <View className="w-12 h-1.5 bg-gray-500 rounded-full self-center mb-4" />
                        <Text className="text-white text-lg font-semibold mb-4">
                            Add Bank Card
                        </Text>

                        <View>
                            <Text className="text-white mb-2">Bank Name</Text>
                            <TouchableOpacity
                                onPress={() => setShowBanks(!showBanks)}
                                className="bg-[#181818] rounded-xl px-4 py-4 flex-row items-center mb-4"
                            >
                                <Ionicons name="business-outline" size={18} color="#888" />
                                <Text className="text-white ml-3 flex-1">
                                    {newBank || "Select Bank"}
                                </Text>
                            </TouchableOpacity>

                            {showBanks && (
                                <View
                                    className="bg-[#181818] rounded-xl mt-2 absolute z-50 top-[90%] w-full"
                                    style={{ maxHeight: 200 }}
                                >
                                    <ScrollView showsVerticalScrollIndicator>
                                        {banks.map((bank, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {
                                                    setNewBank(bank.title);
                                                    setShowBanks(false);
                                                }}
                                                className="px-4 py-3 flex-row gap-4 items-center border-b border-[#2A2A2A]"
                                            >
                                                <SvgUri
                                                    height={32}
                                                    width={32}
                                                    uri={bank.route}
                                                />
                                                <Text className="text-white">{bank.title}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>

                        <Text className="text-white mb-2 mt-4">Card Number</Text>
                        <TextInput
                            value={newCardNumber}
                            onChangeText={(text) =>
                                setNewCardNumber(formatCardNumber(text))
                            }
                            placeholder='Card Number'
                            keyboardType="numeric"
                            className="bg-[#181818] text-white rounded-xl px-4 py-3 mb-4"
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
                </KeyboardAvoidingView>
            </Modal>
        </>
    )
}

export default Bank