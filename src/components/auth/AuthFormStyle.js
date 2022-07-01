import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
        flex: 1,
    },
    inputContainer: {
        backgroundColor: 'white',
        width: wp(85),
        alignItems: 'center',
        marginVertical: hp(5),
        paddingVertical: hp(5),
        borderRadius: 15
    },
    input: {
        width: wp(65),
        borderWidth: 1,
        padding: 10,
        borderBottomColor: 'black',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
    },
    elevation: {
        elevation: 20,
        shadowColor: '#52006A',
    },
    btnContainer: {
        backgroundColor: 'gray',
        width: wp(65),
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: wp(9)
    },
    btnText: {
        color: 'white',
        padding: hp(1.5),
        fontSize: 16,
    },
    footerContainer: {
        marginVertical: wp(6),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    langText: {
        color: 'black',
        fontWeight: 'bold'
    }
});

export default styles;