import $ from "./utils/$"
import { PreviewCard } from "./types"

//#region HTML elements
const urlInputForm = $("#url-input-form") as HTMLFormElement
const previewUrlWrapper = $("#preview-url-wrapper") as HTMLSpanElement
const previewCard = $("#preview-card") as HTMLElement
const previewTitle = $("#preview-title") as HTMLHeadingElement
const previewImageWrapper = $("#preview-image-wrapper") as HTMLDivElement
const previewImage = $("#preview-image") as HTMLImageElement
const previewDescription = $("#preview-description") as HTMLParagraphElement
//#endregion

urlInputForm.addEventListener("submit", async e => {
  e.preventDefault()
  const formData = new FormData(urlInputForm)
  const url = formData.get("url-input") as string
  location.href = `?url=${encodeURIComponent(url)}`
})

window.addEventListener("load", async () => {
  const params = new URLSearchParams(window.location.search)
  const urlParam = params.get("url")
  if (urlParam == null) {
    urlInputForm.style.display = "block"
    previewUrlWrapper.style.display = "none"
    previewCard.style.display = "none"
    return
  }
  let url: URL
  try {
    url = new URL(urlParam)
  } catch (error) {
    setPreviewCard({
      title: "Invalid URL",
      description: "Please enter a valid URL.",
    })
    return
  }
  setLoadingState(true)
  previewUrlWrapper.textContent = url.href
  try {
    await fetchAndSetPreviewCard(url)
    previewUrlWrapper.textContent = ""
    const previewUrl = document.createElement("a")
    previewUrl.href = url.href
    previewUrl.textContent = url.href
    previewUrlWrapper.appendChild(previewUrl)
  } catch (error) {
    setPreviewCard({
      title: "Error",
      description: error.message,
    })
  }
  setLoadingState(false)
})

function setLoadingState(loading: boolean) {
  previewCard.setAttribute("aria-busy", loading.toString())
}

async function fetchAndSetPreviewCard(url: URL) {
  const data = await fetchPreviewCard(url)
  if (data.message != null) throw new Error(data.message)
  setPreviewCard(data)
}

async function fetchPreviewCard(url: URL): Promise<PreviewCard> {
  return fetch(
    `https://embtr.vercel.app/scrape?url=${encodeURIComponent(url.href)}`
  ).then(response => response.json())
}

function setPreviewCard(data: PreviewCard) {
  previewTitle.textContent = data.title
  previewImageWrapper.style.display = "none"
  if (data.image != null) {
    previewImage.src = data.image
    previewImageWrapper.style.display = "block"
  }
  previewDescription.textContent = data.description
}
