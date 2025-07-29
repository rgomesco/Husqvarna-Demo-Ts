module.exports = {
    browsers: ["chrome:headless"],
    src: "./tests",
    baseUrl: "https://www.husqvarna.com/uk",
    skipJsErrors: true,
    concurrency: 2,
    disableNativeAutomation: true,
    reporter: [
        {
            name: "html",
            output: "./reports/test-report.html"
        },
        {
            name: "allure"
        }
    ],
    screenshots: {
        takeOnFails: true,
        path: "./reports/screenshots",
        pathPattern: "${DATE}_${TIME}/${USERAGENT}/${TEST}/${FILE_INDEX}.png"
    },
    videoPath: "./reports/videos",
    videoOptions: {
        singleFile: false,
        failedOnly: true,
        pathPattern: "${DATE}_${TIME}/${USERAGENT}/${TEST}.mp4"
    },
    hooks: {
        test: {
            before: async (t) => {
                await t.maximizeWindow();
            }
        }
    }
};