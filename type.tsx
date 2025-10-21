export type MenuItem = {
    dishName: string;
    description: string;
    course: string | null;
    price: number;
};

export type RootStackParamList = {
    HomeScreen: undefined;
    MenuScreen: {
        items: MenuItem[];
        setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    };
};