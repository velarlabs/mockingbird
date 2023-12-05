import React from "react";

type SizedBoxProps = {
	height?: number;
	width?: number;
};

export default function SizedBox({ height, width }: SizedBoxProps) {
	return <div style={{ height, width }} />;
}
