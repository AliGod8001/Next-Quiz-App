"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";

import GetMainCategory from "@/services/main-categories/GetMainCategory";
import GetCategory from "@/services/categories/GetCategory";
import GetSubCategory from "@/services/sub-categories/GetSubCategory";

import Icon from "../Icon";

type BreadcrumbLink = {
  title: string | React.ReactNode;
  href: string;
};

const CustomBreadcrumb = () => {
  const [links, setLinks] = useState<BreadcrumbLink[]>([
    {
      title: <Icon icon="home-outline" />,
      href: "/",
    },
  ]);
  const path = usePathname();

  useEffect(() => {
    const actions = path.split("/");

    if (actions[1] && links.length < 2) {
      const res = GetMainCategory(Number(actions[1]));
      res.then((data) => {
        setLinks((prevState) => {
          return [
            ...prevState,
            {
              title: data.data?.title,
              href: `/${data.data?.id}`,
            },
          ];
        });
      });
    }

    if (actions[2] && links.length < 3) {
      const res = GetCategory(Number(actions[2]));

      res.then((data) => {
        setLinks((prevState) => {
          return [
            ...prevState,
            {
              title: data.data?.title,
              href: `/${data.data?.mainCategory_id}/${data.data?.id}`,
            },
          ];
        });
      });
    }

    if ( actions[3] && links.length < 4 ) {
      const res = GetSubCategory(Number(actions[3]))

      res.then(data => {
        setLinks(prevState => {
          return [...prevState, {
            title: data.data?.title,
            href: `${actions[1]}/${data.data?.category_id}/${data.data?.id}`
          }]
        })
      })
    }

    if (actions.length === 2 && links.length === 3 || actions.length === 3 && links.length === 4) {
      setLinks((prevState) => {
        return prevState.slice(0, prevState.length - 1);
      });
    }
  }, [path]);

  const items = links.map((link, index) => ({
    title: index+1 === links.length ? <span>{link.title}</span> : <Link href={link.href}>{link.title}</Link>,
  }));

  return (
    <Breadcrumb style={{ marginBottom: 20 }} items={items} />
  );
};

export default CustomBreadcrumb;
