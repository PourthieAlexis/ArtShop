import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

interface ISearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
    const formik = useFormik({
        initialValues: {
            searchTerm: "",
        },
        onSubmit: (values) => {
            onSearch(values.searchTerm);
        },
    });

    return (
        <SearchBarContainer onSubmit={formik.handleSubmit}>
            <SearchInput
                id="searchTerm"
                name="searchTerm"
                type="text"
                placeholder="Search..."
                onChange={formik.handleChange}
                value={formik.values.searchTerm}
            />
            <SearchButton type="submit">
                <CiSearch fontSize={20} />
            </SearchButton>
        </SearchBarContainer>
    );
};

const SearchBarContainer = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 85%;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default SearchBar;
