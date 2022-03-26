/*
    NM --> Name
    NT --> Node Type
    CT --> content
    CTS --> contents
    CL --> color
    LV --> level
    SL --> selected
    OL --> isOrdered
    CO --> column
*/
export default {
    NM: "Example",
    CTS: [
    
        {
            NT: "h",
            CT: "这是一个大标题",
            CL: "#333",
            SL: false
        },
        {
            NT: "hr",
            SL: false
        },
        {
            NT: "p",
            CT: "这是一个段落",
            CL: "#333",
            SL: false
        },
        {
            NT: "floor",
            SL: false,
            CTS: [
                {
                    NT: "h",
                    CT: "这是层次中的大标题",
                    CL: "#333",
                    SL: false
                },
                {
                    NT: "p",
                    CT: "这是一个段落",
                    CL: "#333",
                    SL: false
                },
                {
                    NT: "floor",
                    SL: false,
                    CTS: [
                        {
                            NT: "h",
                            CT: "这是层次中的大标题",
                            CL: "#333",
                            SL: false
                        },
                        {
                            NT: "p",
                            CT: "这是一个段落",
                            CL: "#333",
                            SL: false
                        }
                    ]
                }
            ]
        },
        {
            NT: "list",
            OL: true,
            SL: false,
            CTS: [
                {
                    NT: "li",
                    CT: "这是一个列表项",
                    CL: "#333",
                    SL: false
                },
                {
                    NT: "li",
                    CT: "这是一个列表项",
                    CL: "#333",
                    SL: false
                }
            ]
        },

        {
            NT: "table",
            SL: false,
            CTS: [
                ["表格项","表格项","表格项","表格项"],
                ["表格项","表格项","表格项","表格项"]
            ]
        }

    ]
}