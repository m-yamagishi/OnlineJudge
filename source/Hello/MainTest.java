package Hello;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import org.junit.Test;

public class MainTest {

	@Test
	public void test() {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		System.setOut(new PrintStream(out));

		String[] s = {};
		Main.main(s);

		assertThat(out.toString(), is("Hello World!" + System.lineSeparator()));
	}

}