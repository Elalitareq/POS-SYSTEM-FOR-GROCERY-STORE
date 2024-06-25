const keyMapper = {
    // User model
    id: "المعرف",
    userName: "اسم المستخدم",
    password: "كلمة السر",
    role: "الدور",
    actions: "الأفعال",
    products: "المنتجات",
    batches: "الدُفعات",
    lastModified: "آخر تعديل",

    // Product model
    name: "الاسم",
    description: "الوصف",
    sku: "رقم المنتج",
    categoryID: "رقم الفئة",
    inventoryCount: "عدد في المخزن",
    soldCount: "عدد المباع",
    regularPrice: "السعر العادي",
    salePrice: "سعر البيع",
    wholesalePrice: "سعر الجملة",
    costPrice: "سعر التكلفة",
    addedBy: "أضيف بواسطة",
    userId: "معرف المستخدم",
    categoryId: "معرف الفئة",

    // Batch model
    receivedDate: "تاريخ الاستلام",
    expiryDate: "تاريخ الانتهاء",
    quantity: "الكمية",

    // Transaction model
    date: "التاريخ",
    totalAmount: "المبلغ الكلي",
    customerId: "معرف العميل",
    employeeId: "معرف الموظف",
    saleType: "نوع البيع",
    details: "التفاصيل",

    // TransactionDetail model
    transactionId: "معرف المعاملة",
    priceAtTimeOfSale: "السعر وقت البيع",

    // Action model
    createdAt: "تاريخ الإنشاء",
    updatedAt: "تاريخ التحديث",
    actionType: "نوع الفعل",

    // Enum Role
    SUPERADMIN: "مدير أعلى",
    ADMIN: "مدير",
    EMPLOYEE: "موظف",

    // Enum SaleType
    WHOLESALE: "بيع بالجملة",
    REGULAR: "بيع عادي",

};

const keyMapperEnglish = {
    // User model
    id: "ID",
    userName: "Username",
    password: "Password",
    role: "Role",
    actions: "Actions",
    products: "Products",
    batches: "Batches",
    lastModified: "Last Modified",

    // Product model
    name: "Name",
    description: "Description",
    sku: "SKU",
    categoryID: "Category ID",
    inventoryCount: "Inventory Count",
    soldCount: "Sold Count",
    regularPrice: "Regular Price",
    salePrice: "Sale Price",
    wholesalePrice: "Wholesale Price",
    costPrice: "Cost Price",
    addedBy: "Added By",
    userId: "User ID",
    categoryId: "Category ID",

    // Batch model
    receivedDate: "Received Date",
    expiryDate: "Expiry Date",
    quantity: "Quantity",

    // Category model

    // Transaction model
    date: "Date",
    totalAmount: "Total Amount",
    customerId: "Customer ID",
    employeeId: "Employee ID",
    saleType: "Sale Type",
    details: "Details",

    // TransactionDetail model
    transactionId: "Transaction ID",
    priceAtTimeOfSale: "Price at Time of Sale",

    // Action model
    createdAt: "Created At",
    updatedAt: "Updated At",
    actionType: "Action Type",

    // Enum Role
    SUPERADMIN: "Superadmin",
    ADMIN: "Admin",
    EMPLOYEE: "Employee",

    // Enum SaleType
    WHOLESALE: "Wholesale",
    REGULAR: "Regular",
};
export const getArrayOfObjectAddInArabicAndEnglish = (addObjects) => {
    const changesInArabic = [];
    const changesInEnglish = [];

    addObjects.forEach(addObject => {
        for (const key in addObject) {
            if (key !== "lastModified") {
                const change = {
                    key,
                    newValue: addObject[key],
                };
                changesInArabic.push(`${keyMapper[change.key]} : ${change.newValue}`);
                changesInEnglish.push(`${keyMapperEnglish[change.key]} : ${change.newValue}`);
            }
        }
    });

    return {
        ar: changesInArabic.join("\n"),
        en: changesInEnglish.join("\n"),
    };
};


export const getObjectAddInArabicAndEnglish = (addObject) => {
    const changes = [];
    for (const key in addObject) {
        if (key !== "lastModified") {
            changes.push({
                key,
                newValue: addObject[key],
            });
        }
    }

    return {
        ar: `${changes.map((change) => `${keyMapper[change.key]} :  ${change.newValue}`).join("\n")}`,
        en: `${changes.map((change) => `${keyMapperEnglish[change.key]} :  ${change.newValue}`).join("\n")}`,
    };
};

export const getObjectChangesInArabicAndEnglish = (oldObject, newObject) => {
    const changes = [];
    for (const key in newObject) {
        if (oldObject[key] !== newObject[key] && key !== "lastModified") {
            changes.push({
                key,
                oldValue: oldObject[key],
                newValue: newObject[key],
            });
        }
    }

    return {
        isChanged: changes.length > 0,
        ar: `${changes.map((change) => `${keyMapper[change.key]} : ${change.oldValue} تم تغييرها الى ${change.newValue}`).join("\n")}`,
        en: `${changes.map((change) => `${keyMapperEnglish[change.key]} : ${change.oldValue} changed to ${change.newValue}`).join("\n")}`,
    };
};
