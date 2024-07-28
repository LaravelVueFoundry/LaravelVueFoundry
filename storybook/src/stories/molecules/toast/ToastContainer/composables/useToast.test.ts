import { afterEach, describe, expect, it } from "vitest"
import useToast from "./useToast"

describe("toastContainer", () => {
  const toastStore = useToast()

  afterEach(() => {
    toastStore.toasts.value = []
  })

  it("has an empty list of toasts", async () => {
    expect(toastStore.toasts.value).toStrictEqual([])
  })

  it("can add an info toast", async () => {
    toastStore.info("Toast message")

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[0].icon).toBe("mdi:info")
    expect(toastStore.toasts.value[0].message).toBe("Toast message")
  })

  it("can add a warning toast", async () => {
    toastStore.warning("Toast message")

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[0].icon).toBe("mdi:alert-octagon")
    expect(toastStore.toasts.value[0].message).toBe("Toast message")
  })

  it("can add an error toast", async () => {
    toastStore.error("Toast message")

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[0].icon).toBe("mdi:alert")
    expect(toastStore.toasts.value[0].message).toBe("Toast message")
  })

  it("can add a success toast", async () => {
    toastStore.success("Toast message")

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[0].icon).toBe("mdi:check-circle")
    expect(toastStore.toasts.value[0].message).toBe("Toast message")
  })

  it("can add multiple toasts", async () => {
    toastStore.info("Toast message")
    toastStore.info("Toast message")
    toastStore.info("Toast message")

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[1].id).toBe(2)
    expect(toastStore.toasts.value[2].id).toBe(3)
  })

  it("can remove toasts", async () => {
    toastStore.info("Toast message")
    toastStore.info("Toast message")
    toastStore.info("Toast message")
    toastStore.info("Toast message")

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[1].id).toBe(2)
    expect(toastStore.toasts.value[2].id).toBe(3)
    expect(toastStore.toasts.value[3].id).toBe(4)

    toastStore.removeToast(2)

    expect(toastStore.toasts.value[0].id).toBe(1)
    expect(toastStore.toasts.value[1].id).toBe(3)
    expect(toastStore.toasts.value[2].id).toBe(4)
    expect(toastStore.toasts.value[3]).toBeUndefined()
  })
})
