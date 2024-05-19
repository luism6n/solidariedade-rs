import Header from "@/components/Header";

export default function Layout({
  children,
  props,
}: {
  children: React.ReactNode;
  props: {
    headerProps: React.ComponentProps<typeof Header>;
  };
}) {
  return (
    <div className="flex h-screen flex-col bg-mbp-light-gray">
      <Header {...props.headerProps} />
      <div className="flex flex-1 flex-col gap-md bg-mbp-light-gray p-lg">
        {children}
      </div>
    </div>
  );
}
