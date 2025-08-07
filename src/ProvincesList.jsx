import React, { useEffect, useState } from "react";
import Select from 'react-select';

const mainFont = {
    fontFamily: 'Segoe UI, Arial, sans-serif',
};

const cardStyle = {
    maxWidth: 500,
    width: '100%',
    margin: "40px auto",
    padding: 32,
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.08)",
    border: '1.5px solid #eee',
    color: '#222',
    ...mainFont,
};

const selectBaseStyle = {
    width: 320,
    maxWidth: '100%',
    display: 'block',
    margin: '0 auto 20px auto',
    padding: "12px 40px 12px 16px",
    borderRadius: 12,
    border: "1.5px solid #fda085",
    fontSize: 16,
    background: '#fff url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M4 6l4 4 4-4\' stroke=\'%23fda085\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") no-repeat right 12px center',
    appearance: 'none',
    outline: 'none',
    color: '#222', // luôn đen
    transition: 'color 0.2s',
};

const selectHoverStyle = {
    color: '#f76b1c', // đỏ khi hover
};

const inputStyle = {
    width: 220,
    maxWidth: '100%',
    display: 'block',
    margin: '0 auto 20px auto',
    padding: "12px 40px 12px 16px",
    borderRadius: 12,
    border: "1.5px solid #fda085",
    fontSize: 16,
    background: '#fff url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'6\' stroke=\'%23fda085\' stroke-width=\'2\'/%3E%3Cpath d=\'M15 15l-3.5-3.5\' stroke=\'%23fda085\' stroke-width=\'2\' stroke-linecap=\'round\'/%3E%3C/svg%3E") no-repeat right 12px center',
    outline: 'none',
    color: '#f76b1c',
};

const listStyle = {
    maxHeight: 320,
    overflowY: "auto",
    paddingLeft: 0,
    margin: 0,
    listStyle: 'none',
    /* Custom scrollbar */
    scrollbarWidth: 'thin',
    scrollbarColor: '#fda085 #fff',
};

// Thêm style cho scrollbar cho Chrome/Webkit
const customScrollbar = `
  ul::-webkit-scrollbar {
    width: 8px;
    background: #fff;
    border-radius: 8px;
  }
  ul::-webkit-scrollbar-thumb {
    background: #fda085;
    border-radius: 8px;
  }
`;

const wardItemStyle = {
    padding: "10px 16px",
    borderRadius: 10,
    marginBottom: 8,
    background: "#fff7f0",
    color: "#d35400",
    fontWeight: 500,
    fontSize: 15,
    transition: 'background 0.2s',
    cursor: 'pointer',
};

const wardItemHover = {
    background: "#ffe0c2",
};

const titleStyle = {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 24,
    color: '#f76b1c',
    letterSpacing: 1,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.35)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const modalStyle = {
    background: '#fff',
    borderRadius: 18,
    padding: 32,
    minWidth: 320,
    maxWidth: 420,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    color: '#222',
    ...mainFont,
    position: 'relative',
};

const closeBtnStyle = {
    position: 'absolute',
    top: 12,
    right: 18,
    background: 'none',
    border: 'none',
    fontSize: 22,
    color: '#f76b1c',
    cursor: 'pointer',
};

const labelStyle = { fontWeight: 600, color: '#f76b1c', marginRight: 4 };
const valueStyle = { color: '#222' };
const listItemStyle = { marginBottom: 6 };

// Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

const getResponsiveFontSize = () => (window.innerWidth <= 600 ? 14 : 16);
const getResponsiveTitleFontSize = () => (window.innerWidth <= 600 ? 20 : 28);
const getResponsiveModalTitleFontSize = () => (window.innerWidth <= 600 ? 17 : 22);

const getResponsiveCardStyle = () => {
    if (window.innerWidth <= 600) {
        return {
            ...cardStyle,
            maxWidth: '96vw',
            padding: 12,
            borderRadius: 14,
            fontSize: getResponsiveFontSize(),
        };
    }
    return { ...cardStyle, fontSize: getResponsiveFontSize() };
};

const getResponsiveModalStyle = () => {
    if (window.innerWidth <= 600) {
        return {
            ...modalStyle,
            maxWidth: '96vw',
            minWidth: 0,
            padding: 16,
            borderRadius: 12,
            fontSize: getResponsiveFontSize(),
        };
    }
    return { ...modalStyle, fontSize: getResponsiveFontSize() };
};

const getResponsiveInputStyle = () => {
    if (window.innerWidth <= 600) {
        return { ...inputStyle, width: '100%', minWidth: 0, fontSize: getResponsiveFontSize(), padding: '10px 36px 10px 12px' };
    }
    return { ...inputStyle, fontSize: getResponsiveFontSize() };
};

const getResponsiveSelectStyle = () => {
    if (window.innerWidth <= 600) {
        return {
            width: '100%',
            minWidth: 0,
            fontSize: getResponsiveFontSize(),
            margin: '0 auto 20px auto',
        };
    }
    return {
        width: 320,
        maxWidth: '100%',
        fontSize: getResponsiveFontSize(),
        margin: '0 auto 20px auto',
    };
};

const getResponsiveListStyle = () => {
    if (window.innerWidth <= 600) {
        return { ...listStyle, maxHeight: 220, fontSize: getResponsiveFontSize() };
    }
    return { ...listStyle, fontSize: getResponsiveFontSize() };
};

const getResponsiveTitleStyle = () => {
    return {
        ...titleStyle,
        fontSize: getResponsiveTitleFontSize(),
    };
};

const getResponsiveModalTitleStyle = () => {
    return {
        color: '#f76b1c',
        marginBottom: 18,
        fontSize: getResponsiveModalTitleFontSize(),
        fontWeight: 700,
        textAlign: 'center',
    };
};

const ProvincesList = () => {
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [search, setSearch] = useState("");
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoverSelect, setHoverSelect] = useState(false);
    const [hoverIdx, setHoverIdx] = useState(-1);
    const [modalWard, setModalWard] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        fetch("/provinces_with_wards.json")
            .then((res) => res.json())
            .then((data) => {
                setProvinces(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!selectedProvince) {
            setWards([]);
            return;
        }
        const province = provinces.find((p) => p.province_code === selectedProvince);
        if (province && Array.isArray(province.wards)) {
            setWards(province.wards);
        } else {
            setWards([]);
        }
    }, [selectedProvince, provinces]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Chuẩn bị options cho react-select
    const provinceOptions = provinces.map((province) => ({
        value: province.province_code,
        label: province.name,
    }));

    // Tìm object option tương ứng
    const selectedOption = provinceOptions.find(opt => opt.value === selectedProvince) || null;

    // Tìm kiếm không phân biệt hoa thường và không dấu
    const filteredWards = wards.filter((ward) => {
        const wardName = removeVietnameseTones(ward.ward_name).toLowerCase();
        const searchStr = removeVietnameseTones(search).toLowerCase();
        return wardName.includes(searchStr);
    });

    return (
        <div style={getResponsiveCardStyle()}> {/* responsive card */}
            <style>{customScrollbar}</style>
            <div style={getResponsiveTitleStyle()}>
                <span role="img" aria-label="map">🗺️</span> Danh bạ Hành chính Việt Nam
            </div>
            {loading ? (
                <p style={{ textAlign: 'center', color: '#f76b1c', fontWeight: 500, fontSize: getResponsiveFontSize() }}>Đang tải dữ liệu...</p>
            ) : (
                <>
                    <div style={{ position: 'relative', ...getResponsiveSelectStyle() }}>
                        <Select
                            options={provinceOptions}
                            value={selectedOption}
                            onChange={opt => setSelectedProvince(opt ? opt.value : "")}
                            placeholder="🏢 -- Chọn tỉnh/thành phố --"
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderRadius: 12,
                                    borderColor: state.isFocused ? '#fda085' : '#fda085',
                                    boxShadow: 'none',
                                    minHeight: 44,
                                    fontSize: getResponsiveFontSize(),
                                    color: '#222',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    borderRadius: 12,
                                    zIndex: 9999,
                                    width: '100%',
                                    minWidth: 0,
                                    fontSize: getResponsiveFontSize(),
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    color: state.isSelected ? '#fff' : '#222',
                                    backgroundColor: state.isSelected ? '#fda085' : state.isFocused ? '#ffe0c2' : '#fff',
                                    fontWeight: state.isSelected ? 600 : 400,
                                    fontSize: getResponsiveFontSize(),
                                }),
                                singleValue: (base) => ({ ...base, color: '#222', fontSize: getResponsiveFontSize() }),
                                placeholder: (base) => ({ ...base, color: '#888', fontSize: getResponsiveFontSize() }),
                                menuPortal: base => ({ ...base, zIndex: 9999 }),
                            }}
                            menuPortalTarget={document.body}
                            menuPlacement="auto"
                            isClearable
                        />
                    </div>
                    {selectedProvince && (
                        <>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="🔍 Tìm kiếm xã/phường..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={getResponsiveInputStyle()}
                                />
                            </div>
                            <ul style={getResponsiveListStyle()}>
                                {filteredWards.length === 0 ? (
                                    <li style={{ color: '#aaa', textAlign: 'center', padding: 16, fontSize: getResponsiveFontSize() }}>Không có xã/phường phù hợp.</li>
                                ) : (
                                    filteredWards.map((ward, idx) => (
                                        <li
                                            key={ward.ward_code + '-' + idx}
                                            style={hoverIdx === idx ? { ...wardItemStyle, ...wardItemHover, fontSize: getResponsiveFontSize() } : { ...wardItemStyle, fontSize: getResponsiveFontSize() }}
                                            onMouseEnter={() => setHoverIdx(idx)}
                                            onMouseLeave={() => setHoverIdx(-1)}
                                            onClick={() => setModalWard(ward)}
                                        >
                                            <span role="img" aria-label="pin">📍</span> {ward.ward_name} <span style={{ color: '#888', fontWeight: 400 }}>(Mã: {ward.ward_code})</span>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </>
                    )}
                </>
            )}
            {modalWard && (
                <div style={modalOverlayStyle} onClick={() => setModalWard(null)}>
                    <div style={getResponsiveModalStyle()} onClick={e => e.stopPropagation()}>
                        <button style={closeBtnStyle} onClick={() => setModalWard(null)} title="Đóng">×</button>
                        <h3 style={getResponsiveModalTitleStyle()}>Thông tin xã/phường</h3>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: getResponsiveFontSize(), maxHeight: 320, overflowY: 'auto' }}>
                            <li style={listItemStyle}><span style={labelStyle}>Tên xã/phường:</span> <span style={valueStyle}>{modalWard.ward_name}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Mã xã/phường:</span> <span style={valueStyle}>{modalWard.ward_code}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Tỉnh/Thành phố:</span> <span style={valueStyle}>{modalWard.province_name}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Mã tỉnh:</span> <span style={valueStyle}>{modalWard.province_code}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Tên viết tắt tỉnh:</span> <span style={valueStyle}>{modalWard.province_short_name}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Mã viết tắt tỉnh:</span> <span style={valueStyle}>{modalWard.province_code_short}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Loại đơn vị:</span> <span style={valueStyle}>{modalWard.place_type}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Có sáp nhập:</span> <span style={valueStyle}>{modalWard.has_merger ? 'Có' : 'Không'}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Đơn vị cũ:</span> <span style={valueStyle}>{Array.isArray(modalWard.old_units) ? modalWard.old_units.join(', ') : ''}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Số đơn vị cũ:</span> <span style={valueStyle}>{modalWard.old_units_count}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Chi tiết sáp nhập:</span> <span style={valueStyle}>{modalWard.merger_details}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Tỉnh đã sáp nhập:</span> <span style={valueStyle}>{Array.isArray(modalWard.province_merged_with) ? modalWard.province_merged_with.join(', ') : ''}</span></li>
                            <li style={listItemStyle}><span style={labelStyle}>Trung tâm hành chính:</span> <span style={valueStyle}>{modalWard.administrative_center}</span></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProvincesList;