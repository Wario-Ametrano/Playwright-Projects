import {test,expect} from '@playwright/test';

test("Gallery renders correctly", async ({page}) => {
    await page.setViewportSize({width: 1280, height: 720});

    await page.goto("http://localhost:3000/gallery");

    await page.waitForFunction(() => {
        const images = document.querySelectorAll('img');
        return Array.from(images).every((img) => img.complete && img.naturalWidth !== 0);
    });

    await expect(page).toHaveScreenshot("gallery-desktop.png",{
        maxDiffPixels: 100,
    });
})

// primo comando per effettuare uno screenshot è: npx playwright test --update-snapshots
// secondo comando per fare il test è: npx playwright test gallery.spec.js