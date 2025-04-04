import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true,
  debug: false,
};

export const initFacebookPixel = () => {
  if (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
  ) {
    ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID, {}, options);
  }
};

export const trackPageView = () => {
  if (typeof window !== "undefined") {
    ReactPixel.pageView();
  }
};

export const trackEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    ReactPixel.track(event, data);
  }
};
