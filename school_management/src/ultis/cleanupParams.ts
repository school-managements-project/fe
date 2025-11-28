export const cleanParams = (params = {}) => {
    const paramsInitial = Object.entries(params).filter(([key, value]) => {
        void key;
        return value !== undefined && value !== null && value !== '';
    });
    return Object.fromEntries(paramsInitial);
};
// const query: {
//     _limit: 10;
//     _page: 1;
//     q: '';
// };
// lúc này result = [["_limit": "10"],[_page: "1" ], ["q": "''"]]
// Tiếp đến result.filter(([key,value]))
// Lúc này key: limit,page,1 ; value: 10,1,"" 
//Xử lí callback key giữ nguyên trả về những giá trị value !== undfined, value == null ,value == ""
// Filter sẽ trả về mảng những giá trị không bị undefiend
//result: [[limit_ 10], [page: 1]]