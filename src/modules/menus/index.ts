import MenuService from "./service";

export default {
  name: "Menus",

  async execute(context: any) {
    const main = await MenuService.getMainMenu(context);
    const footer = await MenuService.getFooterMenu(context);

    return {
      success: true,
      module: "Menus",
      data: {
        main,
        footer
      },
      duration: (main.duration || 0) + (footer.duration || 0)
    };
  }
};