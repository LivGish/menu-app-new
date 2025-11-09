/*CODE ATTRIBUTION*/
/*TITLE: IIE MAST5112 Module Manual 2025*/
/*AUTHOR: The Independent Institute of Education (Pty) Ltd*/
/*DATE: 07/03/2025*/
/*VERSION: 1.0*/
/*AVAILABLE: https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7BC4AAF478-96AC-4469-8005-F7CDC4A15EBB%7D&file=MAST5112MM.docx&action=default&mobileredirect=true*/

export type Course = "Starter" | "Main" | "Dessert";

export type MenuItem = {
    id: string;
    dishName: string;
    description: string;
    course: string | null;
    price: number;
};

export type RootStackParamList = {
    Welcome: undefined;
    Home: undefined;
    Menu: undefined;
    AddItem: undefined;
    Filter: { items: MenuItem[] } | undefined
    };