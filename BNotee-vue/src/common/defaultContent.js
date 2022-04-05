/*
    NM --> Name
    NT --> Node Type
    CT --> Content
    CTS --> Contents
    CL --> Color
    LV --> Level
    SL --> Selected
    OL --> isOrdered
    SUM --> Summary
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
                },
                {
                    NT: "list",
                    OL: false,
                    SL: false,
                    CTS: [
                        {
                            NT: "li",
                            CT: "嵌套列表内一个列表项",
                            CL: "#333",
                            SL: false
                        },
                        {
                            NT: "li",
                            CT: "嵌套列表内一个列表项",
                            CL: "#333",
                            SL: false
                        }
                    ]
                },
            ]
        },
        {
            NT: "table",
            SL: false,
            CTS: [
                ["表格项","表格项","表格项","表格项"],
                ["表格项","表格项","表格项","表格项"]
            ]
        },
        {
            NT: "details",
            SL: false,
            SUM: "这是一个详情块",
            CTS: [
                {
                    CT: "这是一个段落",
                    CL: "#333",
                    SL: false
                },
                {
                    CT: "这是一个段落",
                    CL: "#333",
                    SL: false
                }
            ]
        }

    ]
}