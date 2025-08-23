import Link from "next/link";

export function ThemePanel() {
    return (
        <div className="bg-white dark:bg-gray-200/80 rounded-lg p-5 shadow-sm">
            <h3 className="text-base font-medium mb-4">Theme Selection</h3>
            <div className="grid grid-cols-2 gap-5">
                {themes.map((theme, index) => (
                    <Link
                        key={index}
                        href={{ pathname: theme.href }}
                        className="cursor-pointer  group transition-all ease-in-out duration-300 hover:-translate-y-1"
                    >
                        <div className="relative drop-shadow-md border-2 border-white w-full rounded-md overflow-hidden cursor-pointer mb-1.5 group-hover:drop-shadow-lg transition-all ease-in-out duration-500">
                            <img
                                src={theme.img}
                                width={180}
                                height={200}
                                alt={theme.name || "Product Image"}
                                className="object-cover bg-fill-thumbnail"
                            />
                        </div>

                        <p className="text-sm text-center font-medium">{theme.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

const themes = [{ name: "Default", img: "/assets/demos/home-1.png", href: "/" }];
